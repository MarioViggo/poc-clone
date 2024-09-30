const pdfManager = require('jspdf')
const a = () => {
    const doc = new pdfManager.jsPDF()
    doc.text('Hello world!', 10, 10)
    doc.save('a4.pdf')
}

a()