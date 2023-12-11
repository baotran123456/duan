export default function ItemImage(props) {
    const ip = "http://localhost:8080"
    return (
        // <div className="img">
        <img src={ip + `/${props.files[0].filePath}`} width="100"
            height="130" style={{ borderRadius: '8px' }} className="card-img-top img-responsive" alt="img" />
        // </div>
    )
}