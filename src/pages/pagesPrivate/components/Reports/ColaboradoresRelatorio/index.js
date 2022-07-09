import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import reportTitle from '../reportTitle';
import reportFooter from '../reportFooter';

export default function ColaboradoresPDF(contributors) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const dados = contributors.map((contrib) => [
    { text: contrib.id, fontSize: 9, margin: [0, 2, 0, 2] },
    { text: `${contrib.nome} ${contrib.sobrenome}`, fontSize: 9, margin: [0, 2, 0, 2] },
    { text: contrib.email, fontSize: 9, margin: [0, 2, 0, 2] },
    { text: contrib.telefone, fontSize: 9, margin: [0, 2, 0, 2] },
  ]);

  const details = [
    {
      table: {
        headerRows: 1,
        widths: [20, '*', 150, 100],
        body: [
          [
            { text: 'ID', style: 'tableHeader', fontSize: 10 },
            { text: 'Nome', style: 'tableHeader', fontSize: 10 },
            { text: 'E-mail', style: 'tableHeader', fontSize: 10 },
            { text: 'Telefone', style: 'tableHeader', fontSize: 10 },
          ],
          ...dados,
        ],
      },
      layout: 'headerLineOnly',
    },
    {
      text: `Qtd grupos: ${contributors.length}`,
      alignment: 'right',
      fontSize: 9,
      bold: true,
      margin: [0, 24, 0, 0],
    },
  ];

  const docDefinitios = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],

    header: reportTitle('colaboradores'),
    content: [details],
    footer: reportFooter,
  };

  pdfMake.createPdf(docDefinitios).open();
}
