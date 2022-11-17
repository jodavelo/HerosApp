import { useLocation, useNavigate } from "react-router-dom"
import queryString from 'query-string';
import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../components/HeroCard"
import { getHerosByName } from "../helpers/getHerosByName";

export const SearchPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { q = '' } = queryString.parse( location.search );
    const heros = getHerosByName(q);

    const { searchText, onInputChange } = useForm({
        searchText: q
    })

    const onSearchSubmit = (event) => {
        event.preventDefault();
        //if( searchText.trim().length < 1 ) return;
        navigate(`?q=${ searchText }`)
    }


    return (
        <>
            <h1>SearchPage</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Searching</h4>
                    <hr />
                    <form onSubmit={ onSearchSubmit }>
                        <input 
                            type="text" 
                            placeholder="Search a hero"
                            name="searchText"
                            className="form-control"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ onInputChange }
                        />
                        <button className="btn btn-outline-primary mt-1">
                            Search
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />
                    {
                        (q === '') ? <div className="alert alert-primary animate__animated animate__fadeIn"> Search a hero </div> : ( heros.length === 0 ) && <div className="alert alert-danger animate__animated animate__fadeIn"> No there hero with <b>{ q }</b></div>
                    }
                    
                    

                    {
                        heros.map( hero => (
                            <HeroCard key={ hero.id } { ...hero } />
                        ))
                    }

                    {/* <HeroCard  /> */}

                </div>
            </div>
        </>
    )
}
