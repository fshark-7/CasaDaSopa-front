import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import reportTitle from '../reportTitle';
import reportFooter from '../reportFooter';

export default function RelatorioGrupos() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],

    content: [
      reportTitle('Relatorio quente'),
      {
        table: {
          headerRows: 1,
          widths: [10, 100, 50],
          body: [
            [
              { text: 'Header 1', style: 'tableHeader' },
              { text: 'Header 2', style: 'tableHeader' },
              { text: 'Header 3', style: 'tableHeader' }],

            ['teste value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
          ],
        },
        layout: 'headerLineOnly',
      },
    ],
    footer: reportFooter,
  };

  pdfMake.createPdf(docDefinition).open({}, window);
}
