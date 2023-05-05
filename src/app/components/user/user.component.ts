import {Component, OnInit} from '@angular/core';
import {LoginFirebaseService} from '../../services/login-firebase.service';
import {FirebaseService} from '../../services/firebase.service';
import {FilmInterface} from '../../../interfaces/FilmInterface';
import {Router} from '@angular/router';
import {ActiveElement, Chart, ChartEvent} from 'chart.js/auto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public userName: string = '';
  public email: string = '';
  public avatar: string = '';
  public watched: number = 0;
  public notWached: number = 0;
  public totalFilms: number = 0;
  private uid = sessionStorage.getItem('uid');
  public pieChart: any;
  public library?: FilmInterface[];

  constructor(public _userInfoService: LoginFirebaseService, public _filmsFirebaseService: FirebaseService, public router: Router) {
    if (!this.uid) {
      this.router.navigate(['/login']);
    }

  }

  ngOnInit(): void {
    //Get user info
    const user = this._userInfoService.getUser();
    user.then((res: any) => {
      this.userName = res.name;
      this.email = res.email;
      this.avatar = res.avatar;
    });

    //Prepare the pie
    if (this.uid) {
      this._filmsFirebaseService.getLibrary(this.uid).subscribe((res:any)=> {
        let watchedFilms;
        this.totalFilms = res.length;
        for (const item of res) {
          item.data()['watched']?this.watched++:this.notWached++;
        }
        this.generateChart()
      })
      //Get watched films
      this._filmsFirebaseService.getWatchedFilms(this.uid).then(res => {
        //this.library = res.filter((film: FilmInterface) => !film.watched);
        this.library=res
      });
      console.log(this.library)
    }


  }

  generateChart() {
    this.pieChart = new Chart('MyChart', {
      type: 'doughnut',
      data: {
        labels: ['No vistas', 'Vistas'],
        datasets: [{
          data: [this.notWached, this.watched],
          backgroundColor: ['#3182ce', '#98FB98']
        }]
      }
    });
  }

}
