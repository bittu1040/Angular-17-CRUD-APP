import { CurrencyPipe, DatePipe, formatDate, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-invoice-generator',
  standalone: true,
  imports: [NgFor, CurrencyPipe, DatePipe, NgIf, ReactiveFormsModule],
  templateUrl: './invoice-generator.component.html',
  styleUrl: './invoice-generator.component.scss'
})
export class InvoiceGeneratorComponent implements OnInit {


  invoiceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      customerName: ['Bittu', Validators.required],
      customerEmail: ['bittu@gmail.com', [Validators.required, Validators.email]],
      customerAddress: ['Banglore India', Validators.required],
      customerPhone: ['+91 123456789', Validators.required],
      items: this.fb.array([this.createItem()])
    });
  }

  ngOnInit(): void {
    this.calculateTotal();
    this.invoiceForm.get('items')?.valueChanges.subscribe(() => {
      this.calculateTotal();
    })
  }

  calculateTotal(): void {
    this.items.controls.forEach((item) => {
      const quantity = item.get('quantity')?.value || 0;
      const price = item.get('price')?.value || 0;
      const totalPrice = quantity * price;
      item.get('totalPrice')?.setValue(totalPrice, { emitEvent: false });
    });
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      quantity: ["", [Validators.required, Validators.min(1)]],
      price: ["", Validators.required],
      totalPrice: [{ value: 0, disabled: true }]
    });
  }

  get totalAmount(): number {
    let total = 0;
    this.items.controls.forEach((item) => {
      total += item.get('totalPrice')?.value || 0;
    });
    return total;
  }

  addItem(): void {    
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }



  generatePDF(): void {
    const doc = new jsPDF();
  
    const date = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 190, 10, { align: 'right' });
  
    // Title
    doc.setFontSize(18);
    doc.text('Invoice', 10, 10);
  
    // Customer Details
    doc.setFontSize(14);
    doc.text('Customer Details', 10, 30);
  
    doc.setFontSize(12);
    doc.text(`Name: ${this.invoiceForm.get('customerName')?.value}`, 10, 40);
    doc.text(`Email: ${this.invoiceForm.get('customerEmail')?.value}`, 10, 50);
    doc.text(`Address: ${this.invoiceForm.get('customerAddress')?.value}`, 10, 60);
    doc.text(`Phone: ${this.invoiceForm.get('customerPhone')?.value}`, 10, 70);
  
    // Order Details
    doc.setFontSize(14);
    doc.text('Order Details', 10, 85);
  
    // Prepare item rows for the table
    const itemRows = this.items.controls.map((control) => [
      control.get('description')?.value,
      control.get('quantity')?.value,
      control.get('price')?.value,
      control.get('totalPrice')?.value,
    ]);
  
    // Add table with item details
    autoTable(doc, {
      head: [['Item Name', 'Quantity', 'Price', 'Total Price']],
      body: itemRows,
      startY: 95,
      theme: 'grid',
      styles: { fontSize: 12 },
      headStyles: { fillColor: [22, 160, 133], textColor: 255 },
      didDrawPage: (data) => {
        doc.setFontSize(12);
        const finalY = data.cursor?.y ?? 100;
        doc.text(`Total Amount: ${this.totalAmount}`, 10, finalY + 10);
      }
    });

    // Save the PDF
    doc.save('invoice.pdf');
  }

}
