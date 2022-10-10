import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdffonts from 'pdfmake/build/vfs_fonts';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { AutenticacionService } from 'src/app/service/autenticacion.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
pdfMake.vfs = pdffonts.pdfMake.vfs;

@Component({
  selector: 'app-download-pdf',
  templateUrl: './download-pdf.component.html',
  styleUrls: ['./download-pdf.component.css']
})
export class DownloadPdfComponent implements OnInit {

  miPortfolio: any;
  miPortfolioExperiencia: any;
  miPortfolioEducacion: any;
  miPortfolioProyecto: any;
  miPortfolioHabilidadDura: any;
  miPortfolioHabilidadBlanda: any;
  dd:any;
  habilidadBlandaList= new Array();
  bodyDataTechColumn= new Array();
  bodyDataTechRow= new Array();

  idUsuario: number = 0;
  idPersona: number = 0;
  showSpinner: boolean = false;




  constructor(private datosPortafolio: DatosPortfoliosService,
              private autenticacionServicio: AutenticacionService,
              private notificationToast: NotificacionToastService) { }

  ngOnInit(): void {

    this.autenticacionServicio.DatosNuevoUsuario().subscribe(data =>{
      this.idUsuario = data.id;
      this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.idUsuario).subscribe(data =>{
        this.idPersona = data.id;
        this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.idUsuario).subscribe(data =>{
          this.miPortfolio=data;
        });
        this.datosPortafolio.obtenerDatosExperienciaPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioExperiencia = data.body;
        });
        this.datosPortafolio.obtenerDatosEducacionPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioEducacion = data.body;
        });
        this.datosPortafolio.obtenerDatosProyectoPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioProyecto = data.body;
        });
        this.datosPortafolio.obtenerDatosHabilidadDuraPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioHabilidadDura = data.body;
        });
        this.datosPortafolio.obtenerDatosHabilidadBlandaPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioHabilidadBlanda = data.body;
        });
      });
    });
  }


  public downloadPDF():void {
    this.showSpinner = true;


    this.autenticacionServicio.DatosNuevoUsuario().subscribe(data =>{
      this.idUsuario = data.id;
      this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.idUsuario).subscribe(data =>{
        this.idPersona = data.id;
        this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.idUsuario).subscribe(data =>{
          this.miPortfolio=data;
        });
        this.datosPortafolio.obtenerDatosExperienciaPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioExperiencia = data.body;
        });
        this.datosPortafolio.obtenerDatosEducacionPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioEducacion = data.body;
        });
        this.datosPortafolio.obtenerDatosProyectoPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioProyecto = data.body;
        });
        this.datosPortafolio.obtenerDatosHabilidadDuraPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioHabilidadDura = data.body;
        });
        this.datosPortafolio.obtenerDatosHabilidadBlandaPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioHabilidadBlanda = data.body;
        });
      });
    });

    this.dd = {
      content:  [
        {
          text: [this.miPortfolio.nombre.toUpperCase(),' ', this.miPortfolio.apellido.toUpperCase()],
          style: 'header',
          alignment: 'center',
          margin:[0, 0, 0, 5]
        },
        {
          text: ['Posición actual: ',this.miPortfolio.posicionDev],
          style: 'subheader',
          alignment: 'center',
          margin:[0, 0, 0, 5]
        },
        {
          text: ['Correo: ',this.miPortfolio.correo,' - ','Tel.: ',this.miPortfolio.telefono,' - ','Lugar residencia: ',this.miPortfolio.domicilio],
          style: 'normal',
          alignment: 'center',
          margin:[0, 0, 0, 20]
        },
        {
          text: 'Sobre Mí',
          style: 'subheader',
          alignment: 'left',
          margin:[0, 0, 0, 10]
        },
        {
          text: [this.miPortfolio.sobreMi],
          style: 'normal',
          alignment: 'justify',
          margin:[0, 0, 0, 20]
        },
      ],
      styles: {
        header: {
          fontSize: 16,
          bold:true
        },
        subheader: {
          fontSize: 14,
          bold:true
        },
        normal: {
          fontSize: 10,

        },
        tableExample: {
          margin: [0, 5, 0, 15],
          alignment: 'center',
          fontSize: 10,
        },
      }
    }

    this.dd.content.push({text: 'Experiencia Laboral',style: 'subheader', alignment: 'left', margin:[0, 0, 0, 10]});
    for(const exp of this.miPortfolioExperiencia){
      this.dd.content.push({text: [exp.nombreEmpresa], style: 'normal', alignment: 'left',bold:true });
      this.dd.content.push({text: [exp.posicion], style: 'normal', alignment: 'left'});
      this.dd.content.push({text: [exp.fechaInicio, ' - ',exp.fechaFin], style: 'normal', alignment: 'left'});
      this.dd.content.push({text: [exp.descripcion], style: 'normal', alignment: 'left', margin:[0, 0, 0, 20]});
    }

    this.dd.content.push({text: 'Formación Académica',style: 'subheader', alignment: 'left', margin:[0, 0, 0, 10]});
    for(const edu of this.miPortfolioEducacion){
      this.dd.content.push({text: [edu.institucion], style: 'normal', alignment: 'left',bold:true });
      this.dd.content.push({text: [edu.titulo], style: 'normal', alignment: 'left'});
      this.dd.content.push({text: [edu.fechaInicio, ' - ',edu.fechaFin], style: 'normal', alignment: 'left'});
      this.dd.content.push({text: [edu.descripcion], style: 'normal', alignment: 'left', margin:[0, 0, 0, 20]});
    }

    this.dd.content.push({text: 'Proyectos',style: 'subheader', alignment: 'left', margin:[0, 0, 0, 10]});
    for(const pro of this.miPortfolioProyecto){
      this.dd.content.push({text: [pro.nombre], style: 'normal', alignment: 'left',bold:true });
      this.dd.content.push({text: [pro.fechaInicio, ' - ',pro.fechaFin], style: 'normal', alignment: 'left'});
      this.dd.content.push({text: [pro.descripcion], style: 'normal', alignment: 'left'});
      this.dd.content.push({text: ['Link repositorio: ',pro.urlRepositorio], style: 'normal', alignment: 'left', margin:[0, 0, 0, 20]});
    }

    this.dd.content.push({text: 'Habilidades',style: 'subheader', alignment: 'left', margin:[0, 0, 0, 10]});
    this.dd.content.push({text: 'Dominio de Tecnologías', style: 'normal', alignment: 'left'});

    for(var i=0; i<this.miPortfolioHabilidadDura.length; i++){
      this.bodyDataTechColumn.push(this.miPortfolioHabilidadDura[i].tecnologia);
      this.bodyDataTechRow.push(this.miPortfolioHabilidadDura[i].progreso);
    }

    this.dd.content.push({style: 'tableExample',table: {
      body: [
          ['Software', 'Progreso-Dominio (%)'],
          [this.bodyDataTechColumn,this.bodyDataTechRow]
      ]
    }});

    this.dd.content.push({text: 'Habilidades Interpersonales', style: 'normal', alignment: 'left', margin:[0, 0, 0, 10]});
    for(var i=0; i<this.miPortfolioHabilidadBlanda.length; i++){
      this.habilidadBlandaList.push(this.miPortfolioHabilidadBlanda[i].hab_blanda);
    }
    this.dd.content.push({ul: this.habilidadBlandaList, style: 'normal', alignment: 'left'});

    const pdf = pdfMake.createPdf(this.dd);
    if(this.miPortfolioExperiencia.length > 0 && this.miPortfolioEducacion.length > 0 && this.miPortfolioProyecto.length > 0 && this.miPortfolioHabilidadDura.length > 0 && this.miPortfolioHabilidadBlanda.length > 0){
      setTimeout(() => {
        this.showSpinner = false;
        }, 2000);
        pdf.download(this.miPortfolio.nombre.toUpperCase()+ " " +this.miPortfolio.apellido.toUpperCase() + "-CV");
    }else {
      setTimeout(() => {
        this.showSpinner = false;
        }, 1500);
        this.notificationToast.showError('Para descargar su CV debe completar todas las secciones',' ');
    }
  }
}


