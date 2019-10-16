import React from 'react';
import $ from "jquery";
import "turn.js";
import '../css/book.css';
import '../../.././node_modules/font-awesome/css/font-awesome.min.css';
import { Range, getTrackBackground } from 'react-range';

const STEP = 0.1;
const MIN = 0;
const MAX = 100;

class Page extends React.Component {

    constructor(props){
        super(props);
        this.state={'page':1,'total':Math.max(),'intial':true,length:0};
    }
    static defaultProps = {
      style: {},
      className: "",
      options: {}
    };
  
    componentDidMount(){
        document.querySelector('.player').src=this.props.page[0].audio;
        document.querySelector('.player').play();
        if(this.el){
            this.setState({...this.state,'length':0,'initial':true,'page':$(this.el).turn("page"),'total':$(this.el).turn("pages")});
        }
      if (this.el) {
        $(this.el).turn(Object.assign({}, this.props.options));
        $(this.el).turn("next");
      }
      document.addEventListener("keydown", this.handleKeyDown, false);
      setInterval(()=>{
          console.log(document.querySelector('.player'));
          this.setState({...this.state,'length':document.querySelector('.player').currentTime/document.querySelector('.player').duration*100});
          if(document.querySelector('.player').currentTime>=document.querySelector('.player').duration){
            document.querySelector(".player").pause();
            document.querySelector('.playbtn').classList.remove('hide');
            document.querySelector('.pausebtn').classList.add('hide');
          }
      }, 50);
    }
  
    componentWillUnmount() {
      if (this.el) {
        $(this.el)
          .turn("destroy")
          .remove();
      }
      document.removeEventListener("keydown", this.handleKeyDown, false);
    }
  
    handleKeyDown = event => {
      if (event.keyCode === 37) {
        $(this.el).turn("previous");
      }
      if (event.keyCode === 39) {
        $(this.el).turn("next");
      }
      if(this.el){
        this.setState({...this.state,'initial':false,'page':$(this.el).turn("page"),'total':$(this.el).turn("pages")});
      }
    };
  
    render() {
      return (
        <div>
            <div
            className={this.props.className}
            style={Object.assign({}, this.props.style)}
            ref={el => (this.el = el)}
            >
            {this.props.children}
            </div>
            <i id="pageturner" className={this.state.initial==true?"disabled fa fa-caret-left":+this.state.page<=3?"disabled fa fa-caret-left":"fa fa-caret-left"} aria-hidden="true" onClick={()=>{
                $(this.el).turn("previous");
                console.log(document.querySelector('.player').src);
                if(this.el){
                    this.setState({...this.state,'length':0,'initial':false,'page':$(this.el).turn("page"),'total':$(this.el).turn("pages")});
                    document.querySelector('.player').src=this.props.page[$(this.el).turn("page")%2==0?$(this.el).turn("page")/2-1:parseInt($(this.el).turn("page")/2)].audio;
                    document.querySelector('.pausebtn').classList.remove('hide');
                    document.querySelector('.playbtn').classList.add('hide');
                }
            }}></i>
            <i id="pageturner" className={this.state.page>=this.state.total-1?"disabled fa fa-caret-right":"fa fa-caret-right"} aria-hidden="true" onClick={()=>{
                $(this.el).turn("next");
                if(this.el){
                    this.setState({...this.state,'length':0,'initial':false,'page':$(this.el).turn("page"),'total':$(this.el).turn("pages")});
                    document.querySelector('.player').src=this.props.page[$(this.el).turn("page")%2==0?$(this.el).turn("page")/2-1:parseInt($(this.el).turn("page")/2)].audio;
                    document.querySelector('.pausebtn').classList.remove('hide');
                    document.querySelector('.playbtn').classList.add('hide');
                }
            }}></i>
            <br/>

        
            <audio autoPlay={true} className="player">
            </audio>
    
            <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                height:"22px"
                }}
            >
                <Range
                values={[this.state.length]}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(length) => {
                    var val=document.querySelector('.player').duration*(length/100);
                        document.querySelector('.player').currentTime=val;
                        this.setState({...this.state,'length':length}); 
                        document.querySelector('.player').play();
                        document.querySelector('.pausebtn').classList.remove('hide');
                        document.querySelector('.playbtn').classList.add('hide'); 
                }}
                renderTrack={({ props, children }) => (
                    <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                        ...props.style,
                        height: "36px",
                        display: "flex",
                        width: "100%"
                    }}
                    >
                <div
                    ref={props.ref}
                    style={{
                    height: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                        values: [this.state.length],
                        colors: ["#F0C236", "#ccc"],
                        min: MIN,
                        max: MAX
                    }),
                    alignSelf: "center"
                    }}
                >
                {children}
                </div>
                    </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                        <div
                        style={{
                            height: "20px",
                            width: "20px",
                            borderRadius: "50%",
                            backgroundColor: "#F0C236"
                        }}
                        >
                        </div>
                    )}
                />
            </div>




            <div className="footer">
                <div className="left">
                <button className="seekbwdbtn" onClick={()=>{
                    document.querySelector(".player").currentTime=document.querySelector(".player").currentTime<=10?0:document.querySelector(".player").currentTime-10;
                    var val = document.querySelector(".player").currentTime/document.querySelector(".player").duration*100;
                    this.setState({...this.state,'length':val});
                }}>
                <i className="fa fa-backward" aria-hidden="true"></i>
                </button>
                <button className="playbtn hide" onClick={()=>{
                    document.querySelector(".player").play();
                    document.querySelector('.playbtn').classList.add('hide');
                    document.querySelector('.pausebtn').classList.remove('hide');
                }}><i className="fa fa-play" aria-hidden="true"></i></button>
                <button className="pausebtn" onClick={()=>{
                    document.querySelector(".player").pause();
                    document.querySelector('.playbtn').classList.remove('hide');
                    document.querySelector('.pausebtn').classList.add('hide');
                }}><i className="fa fa-pause" aria-hidden="true"></i></button>
                <button className="seekfwdbtn" onClick={()=>{
                    document.querySelector(".player").currentTime=document.querySelector(".player").currentTime>=document.querySelector(".player").duration-10?document.querySelector(".player").duration:document.querySelector(".player").currentTime+10;
                    var val = document.querySelector(".player").currentTime/document.querySelector(".player").duration*100;
                    this.setState({...this.state,'length':val});
                }}>
                <i className="fa fa-forward" aria-hidden="true"></i>
                    </button>
                </div>
                
                <div className="right">
                <button className="vupbtn" onClick={()=>{
                    document.querySelector('.voffbtn').classList.remove('hide');
                    document.querySelector('.vupbtn').classList.add('hide');
                    document.querySelector('.player').volume=0;
                    document.querySelector('#volume').value=0;
                }}
                onMouseOver={()=>{
                    document.querySelector('#volume').classList.remove('hide');
                }}
                onMouseLeave={()=>{
                    document.querySelector('#volume').classList.add('hide');
                }}
                >
                    <i className="fa fa-volume-up" aria-hidden="true"></i>
                </button>
                <button className="voffbtn hide" onClick={()=>{
                    document.querySelector('.vupbtn').classList.remove('hide');
                    document.querySelector('.voffbtn').classList.add('hide');
                    document.querySelector('.player').volume=1;
                    document.querySelector('#volume').value=100;
                }}
                onMouseOver={()=>{
                    document.querySelector('#volume').classList.remove('hide');
                }}
                onMouseLeave={()=>{
                    document.querySelector('#volume').classList.add('hide');
                }}>
                    <i className="fa fa-volume-off" aria-hidden="true"></i>
                </button>
                <br/>
                    <input type="range" className="hide" defaultValue="100" draggable={true} name="volume" id="volume" 
                    onChange={
                        ()=>{
                            document.querySelector('.player').volume=document.querySelector('#volume').value/100;
                        }
                    }
                    onMouseOver={()=>{
                        document.querySelector('#volume').classList.remove('hide');
                    }}
                    onMouseLeave={()=>{
                        document.querySelector('#volume').classList.add('hide');
                    }}
                    />
                </div>
                
            </div>
        </div>
      );
    }
  }

  export default Page;