import './BeerItem.css'

export default function BeerItem( { beer } ){

    return(
        <div className='card'>
            <img src={beer.image_url}></img>
            <h2>{beer.name}</h2>
            <p>{beer.description}</p>
            {beer.first_brewed}
        </div>
    )
}