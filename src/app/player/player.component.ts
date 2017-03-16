import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    AfterViewChecked,
    Input,
    state,
    style,
    transition,
    trigger,
    animate,
    keyframes

} from '@angular/core';
import * as moment from 'moment';


@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css'],
    animations: [
        trigger('animationButtonDownload', [
            state('inactive', style(
                { transform: 'translate(0,-100%)', opacity: 0, display: 'none' }
            )),
            state('active', style(
                { transform: 'translate(0,0)', opacity: 1, display: 'block' }
            )),
            transition('inactive => active', animate(300, keyframes(
                [
                    style(
                        { opacity: 0, transform: 'translate(0,-100%)' }
                    ),
                    style(
                        { opacity: 1, transform: 'translate(0,15px)' }
                    ),
                    style(
                        { opacity: 1, transform: 'translate(0,0)' }
                    )
                ]
            ))),
            transition('active => inactive', animate(300, keyframes(
                [
                    style(
                        { opacity: 1, transform: 'translate(0,0)' }
                    ),
                    style(
                        { opacity: 0, transform: 'translate(0,-15px)' }
                    ),
                    style(
                        { opacity: 0, transform: 'translate(0,-100%)' }
                    )
                ]
            )))
        ])
    ]
})
export class PlayerComponent implements OnInit, AfterViewInit, AfterViewChecked {

    @ViewChild('player') player: ElementRef;
    @ViewChild('processBar') private processBar: ElementRef;
    @ViewChild('iconPlay') private iconPlay: ElementRef;
    @ViewChild('iconVolume') private iconVolume: ElementRef;
    @ViewChild('showTimeHover') private showTimeHover: ElementRef
    @Input("song") Song: any;
    private tooglePlay: boolean = false;
    private toogleVolume: boolean = false;
    public currentTime;
    public showTime: string;
    private durationTime;
    private loaded: boolean = false;
    public currentTimeHover: string;
    public state: string = 'inactive';
    public color: string = "red";

    constructor() { }

    ngOnInit() {
    }
    ngAfterViewInit() {
        this.updateTiming();
    }
    ngAfterViewChecked() {
        this.getdurationTime();
    }
    // get duration time audio
    getdurationTime() {
        if (isNaN(this.player.nativeElement.duration) === false) {
            this.durationTime = this.player.nativeElement.duration;
            this.showTime = this.convertSecondstoMinutes(this.durationTime * 1000);
        }

    }
    // play audio
    playAudio() {
        if (!this.tooglePlay) {
            this.player.nativeElement.pause();
            this.iconPlay.nativeElement.className = "fa fa-play";
        }
        else {
            this.player.nativeElement.play();
            this.iconPlay.nativeElement.className = "fa fa-pause";
        }
        this.tooglePlay = !this.tooglePlay;
    }
    // update time audio
    updateTiming() {
        setInterval(() => {
            let Duration = this.player.nativeElement.duration;
            let currentTime = this.player.nativeElement.currentTime;
            this.currentTime = this.convertSecondstoMinutes(currentTime * 1000)
            let percentage = (currentTime / Duration) * 100;
            this.processBar.nativeElement.style.width = percentage + "%";
        }, 50)

    }
    // go to value in processbar
    goToValue(event) {
        let widthProcessBar = this.processBar.nativeElement.parentElement.clientWidth;
        let widthCurrent = event.layerX;
        let valuePercent = (widthCurrent / widthProcessBar);
        this.player.nativeElement.currentTime = (valuePercent * this.durationTime);
        this.player.nativeElement.play();

    }
    // convert milisecond to minutes using momnet js
    convertSecondstoMinutes(value): string {
        let time = moment.duration(value);
        let Minutes = time.minutes();
        let Second: any = time.seconds();
        if (Second === 0) {
            Second = Second + "0";
        }
        if (Second > 0 && Second < 10) {
            Second = "0" + Second;
        }
        return (Minutes + ":" + Second);
    }
    // turnoff volume audio
    changeVolumeAudio() {
        if (!this.toogleVolume) {
            this.player.nativeElement.muted = true;
            this.iconVolume.nativeElement.className = "fa fa-volume-off";
        }
        else {
            this.player.nativeElement.muted = false;
            this.iconVolume.nativeElement.className = "fa fa-volume-up";
        }
        this.toogleVolume = !this.toogleVolume;

    }
    //show time in processbar
    mouseoverShowTiming(event) {
        let widthProcessBar = this.processBar.nativeElement.parentElement.clientWidth;
        let widthCurrent = event.layerX;
        let valuePercent = (widthCurrent / widthProcessBar);
        let milisecondCurrent = (valuePercent * this.durationTime);
        this.currentTimeHover = this.convertSecondstoMinutes(milisecondCurrent * 1000);
        this.showTimeHover.nativeElement.style.display = "block";
        this.showTimeHover.nativeElement.style.left = `${widthCurrent}px`;
    }
    // hiden time when mouseleave
    removeShowTiming() {
        this.showTimeHover.nativeElement.style.display = "none";
    }
    // download audio
    downloadAudio() {
        this.state = (this.state === 'active' ? 'inactive' : 'active');
    }
}
