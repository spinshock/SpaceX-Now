import React, { Component, ReactElement } from 'react';
import moment, { Moment } from 'moment';
import './countdown-date.css';

type CountdownDateProps = {
    date: Date;
    format: string;
};

type CountdownDateState = {
    date: Moment;
    isCountdown: boolean;
};

type Countdown = {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

export default class CountdownDate extends Component<
    CountdownDateProps,
    CountdownDateState
> {
    public countdown: Countdown | null;
    private countdownTimer!: NodeJS.Timeout;

    constructor(props: CountdownDateProps) {
        super(props);
        this.state = {
            date: moment(props.date, props.format),
            isCountdown: false,
        };
        this.countdown = null;
    }

    componentWillUnmount(): void {
        clearInterval(this.countdownTimer);
    }

    isPast(): boolean {
        return this.state.date.isBefore(moment());
    }

    tick(): void {
        const duration = moment.duration(
            this.state.date.unix() - moment().unix(),
            'seconds'
        );
        this.setCountdown(duration);
        console.log(this.countdown);

        this.setState({ ...this.state });
    }

    setCountdown(duration: moment.Duration): void {
        this.countdown = {
            years: duration.years(),
            months: duration.months(),
            days: duration.days(),
            hours: duration.hours(),
            minutes: duration.minutes(),
            seconds: duration.seconds(),
        };
    }

    startTimer(): void {
        this.countdownTimer = setInterval(this.tick.bind(this), 1000);
        this.tick();
    }

    handleDateClick(): void {
        clearInterval(this.countdownTimer);
        this.tick();
        if (!this.state.isCountdown) {
            this.startTimer();
        }
        this.setState({
            ...this.state,
            isCountdown: !this.state.isCountdown,
        });
    }

    render(): ReactElement {
        if (this.isPast()) {
            return (
                <div className="date-container past-date">
                    <span className="date date-day">
                        {this.state.date.format('DD')}
                    </span>
                    -
                    <span className="date date-month">
                        {this.state.date.format('MMM')}
                    </span>
                    <span className="date date-year">
                        {this.state.date.format('YYYY')}
                    </span>
                </div>
            );
        }
        if (this.state.isCountdown) {
            return (
                <div onClick={this.handleDateClick.bind(this)}>
                    
                </div>
                );
        }
        return (
            <div
                className="date-container"
                onClick={this.handleDateClick.bind(this)}
            >
                <span className="date date-day">
                    {this.state.date.format('DD')}
                </span>
                -
                <span className="date date-month">
                    {this.state.date.format('MMM')}
                </span>
                <span className="date date-year">
                    {this.state.date.format('YYYY')}
                </span>
            </div>
        );
    }
}
