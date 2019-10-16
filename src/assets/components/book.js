import React from "react";
import $ from "jquery";
// import "turn.js";


import "../css/book.css";
import Page from './page';


const options = {
  width: 700,
  height: 450,
  start:2,
  autoCenter: true,
  display: "double",
  acceleration: true,
  elevation: 50,
  gradients: !$.isTouch,
  when: {
    turned: function(e, page) {
    //   console.log("Current view: ", $(this).turn("view"));
    }
  }
};

const pages = [
  {'image1':"https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/01.jpg",'image2':"https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/04.jpg",'audio':'https://res.cloudinary.com/dbbjdtdzy/video/upload/v1571169399/Zindabaad_Yaarian-_Mr-Jatt.com_gzauhh.mp3'},
  {'image1':"https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/02.jpg",'image2':"https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/05.jpg",'audio':'https://res.cloudinary.com/dbbjdtdzy/video/upload/v1571169399/Zindabaad_Yaarian-_Mr-Jatt.com_gzauhh.mp3'},
  {'image1':"https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/03.jpg",
  'image2':"https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/06.jpg",'audio':'https://res.cloudinary.com/dbbjdtdzy/video/upload/v1571169399/Zindabaad_Yaarian-_Mr-Jatt.com_gzauhh.mp3'}
];


const book = () => {
    var pageimg=[];
    for(let i=0;i<pages.length;i++){
        pageimg.push(pages[i].image1);
        pageimg.push(pages[i].image2);
    }
  return (
    <div className="book">
        <Page page={pages} options={options} className="magazine">
        <img src={pages[0].image1} alt={"Page Number 1"} />
        {pageimg.map((page, index) => (
            <div key={index} className="page">
            <img src={page} alt={"Page Number " + index } />
            </div>
        ))}
        </Page>
    </div>
  );
};

export default book;