import { useEffect } from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Itemhinh(props) {
  const ip = "http://localhost:8080"

  return (
    <Slider
      autoplay={true}
      autoplaySpeed={2000}
      dots
      customPaging={(i) => {
        return (
          <div>
            <img src={ip + `/${props.item[i].filePath}`} className="detail-main-top-left-img" alt="" />
          </div>
        )
      }}
      dotsClass="slick-dots custom-indicator"
    >
      {
        props.item.map((item, index) => (
          <div className="detail-main-top-left-slideritem" key={index}>
            <img className="detail-main-top-left-image" src={ip + `/${item.filePath}`} alt="" />
          </div>
        ))
      }
    </Slider>
  )
}