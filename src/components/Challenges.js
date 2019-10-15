import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import styles from './Challenges.module.css';

class Challenges extends Component {
  constructor(props) {
    super(props);
    this.challs = [
        {
            id: "01",
            author: "Simon",
            points: 100,
        },
        {
            id: "02",
            author: "Paul",
            points: 500,
        },
        {
            id: "03",
            author: "Jacques",
            points: 1500,
        },
        {
            id: "04",
            author: "Thomas",
            points: 5000,
        }
    ];
    this.title = "Forensic";
    this.easy = 75;
    this.mean = 25;
    this.hard = 75;
    this.deadly = 25;
    this.accompl = [
        {
            name: "Connie G.",
            time: "0:44",
            num: 1,
        },
        {
            name: "IdK",
            time: "0:48",
            num: 1,
        },
        {
            name: "HarryWKM",
            time: "1:13",
            num: 1,
        },
        {
            name: "BBlackwo",
            time: "2:25",
            num: 1,
        }
    ];
  }

  get_color_stat(x) {
    if (x < 25) {
        return '#ff0000';
    } else if (x < 50) {
        return '#ff9999';
    } else if (x < 75) {
        return '#000000';
    } else {
        return '#00ff00';
    }
  }

  get_color_points(x) {
    if (x < 400) {
        return '#00ff00';
    } else if (x < 1000) {
        return '#ffff00';
    } else if (x < 3500) {
        return '#ff0000';
    } else {
        return '#000000';
    }
  }

  render() {
    return (
        <div className={`Challenges  ${styles.main_div}`}>
            <div className={`Challenges  ${styles.main_flex}`}>
                <div className={`Challenges  ${styles.col1}`}>
                    {this.challs.map(chall => (
                        <div className={`Challenges  ${styles.chall_row}`}>
                            <div className={`Challenges  ${styles.chall_row_flex}`}>
                                <div className={`Challenges  ${styles.chall_blue_block}`}/>
                                <div className={`Challenges  ${styles.chall_text}`}>
                                    <span>Chall {chall.id}</span><span>{chall.author}</span>
                                </div>
                                <div className={`Challenges  ${styles.chall_points_colored}`} style={{background: this.get_color_points(chall.points),}}>
                                    <div className={`Challenges  ${styles.chall_points_white}`}>
                                        {chall.points}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
                <div className={`Challenges  ${styles.col2}`}>
                <div className={`Challenges  ${styles.col2_flex}`}>
                    <span className={`Challenges ${styles.title}`}>
                        {this.title}
                    </span>
                    <div className={`Challenges ${styles.diff}`}>
                        <span>Faciles</span>
                        <div className={`Challenges  ${styles.diff_bar_white}`}>
                            <div className={`Challenges  ${styles.diff_bar}`} style={{width: this.easy + '%', background: this.get_color_stat(this.easy),}}/>
                        </div>
                    </div>
                    <div className={`Challenges ${styles.diff}`}>
                        <span>Moyens</span>
                        <div className={`Challenges  ${styles.diff_bar_white}`}>
                            <div className={`Challenges  ${styles.diff_bar}`} style={{width: this.mean + '%', background: this.get_color_stat(this.mean),}}/>
                        </div>
                    </div>
                    <div className={`Challenges ${styles.diff}`}>
                        <span>Difficiles</span>
                        <div className={`Challenges  ${styles.diff_bar_white}`}>
                            <div className={`Challenges  ${styles.diff_bar}`} style={{width: this.hard + '%', background: this.get_color_stat(this.hard),}}/>
                        </div>
                    </div>
                    <div className={`Challenges ${styles.diff}`}>
                        <span>Mortels</span>
                        <div className={`Challenges  ${styles.diff_bar_white}`}>
                            <div className={`Challenges  ${styles.diff_bar}`} style={{width: this.deadly + '%', background: this.get_color_stat(this.deadly),}}/>
                        </div>
                    </div>
                    <div className={`Challenges ${styles.updates}`}>
                        {this.accompl.map(acc => (
                            <div className={`Challenges ${styles.update}`}>
                                <div className={`Challenges ${styles.update_image}`}/>
                                <div className={`Challenges ${styles.update_content}`}>
                                    <span className={`Challenges ${styles.update_time}`}>
                                        {acc.name} à {acc.time}
                                    </span>
                                    <span className={`Challenges ${styles.update_phrase}`}>
                                        A fini le chall {acc.num}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Challenges;
