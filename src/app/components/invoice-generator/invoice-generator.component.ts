import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-invoice-generator',
  standalone: true,
  imports: [NgFor, CurrencyPipe, DatePipe],
  templateUrl: './invoice-generator.component.html',
  styleUrl: './invoice-generator.component.scss'
})
export class InvoiceGeneratorComponent {

  invoiceData = {
    invoiceNumber: 'INV-1001',
    date: new Date(),
    customerName: 'John Doe',
    items: [
      { name: 'Product 1', quantity: 2, price: 50 },
      { name: 'Product 2', quantity: 1, price: 30 },
      { name: 'Product 3', quantity: 3, price: 20 }
    ]
  };

  // Calculate total price
  calculateTotal() {
    return this.invoiceData.items.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  // Method to generate PDF
  generatePDF() {
    const invoiceElement = document.getElementById('invoice');
    
    // Check if invoiceElement is not null
    if (invoiceElement) {
      html2canvas(invoiceElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('p', 'mm', 'a4');
  
        const imgHeight = (canvas.height * 208) / canvas.width;
        doc.addImage(imgData, 'PNG', 0, 0, 208, imgHeight);
  
        doc.save('invoice.pdf');
      });
    } else {
      console.error("Invoice element not found.");
    }
  }

}
