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
    public userName: string = 'AAAAAA';
    public email: string = '';
    public avatar: string = '';
    public watched: number = 0;
    public notWached: number = 0;
    public totalFilms: number = 0;
    private uid = sessionStorage.getItem('uid');
    public pieChart: any;

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

        //Get films and split them
        if (this.uid) {
            this._filmsFirebaseService.getFilms(this.uid).then((res: []) => {
                this.totalFilms = res.length;
                this.watched = res.filter((film: FilmInterface) => film.watched).length;
                this.notWached = res.filter((film: FilmInterface) => !film.watched).length;
                this.generateChart();
            });
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
            },
            options: {
                events: ['click'],
                onClick(event: ChartEvent, elements: ActiveElement[], chart: Chart) {
                    console.log(event)
                }
            }
        });
    }

}
