import React, { Component } from 'react';
import RecipeDatasService from '../services/recipe.service';
import ShopDataService from '../services/shop.service';
import Recipes from '../components/Recipes';
import Dropdown from 'react-bootstrap/Dropdown';


class ListRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      currentRecipe: null,
      currentIndex: -1,
      isClicked: false,
      shoplist: [],
      
      clickedAddtoShop: false,
      
    };
    this.retrieveRecipes = this.retrieveRecipes.bind(this);
    this.setActiveRecipes = this.setActiveRecipes.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.addtoShop = this.addtoShop.bind(this);
  }
  componentDidMount() {
    this.retrieveRecipes();
  }
  componentWillUpdate() {
    this.retrieveRecipes();
  }
  retrieveRecipes() {
    RecipeDatasService.getAll()
      .then(res => {
        this.setState({
          recipes: res.data,
        });
        // console.log(res.data);
      })
      .catch(e => { console.log(e); });
  }

  setActiveRecipes(recipe, index) {
    this.setState({
      currentRecipe: recipe,
      currentIndex: index,
      message:''
    });
  }

  handleClick() {
    this.setState({
      isClicked: true,
      currentRecipe: null
    })
  }

  // handleBack(){
  //     this.setState({
  //         currentRecipe: null
  //     })
  // }

  deleteRecipe() {
    RecipeDatasService.delete(this.state.currentRecipe.id)
      .then(res => {
        // console.log(res.data);
        // this.props.history.push('/recipes')
        this.setState({
          currentRecipe:null
        })
      })
      .catch(e => {
        console.log(e);
      });
  }

  addtoShop() {
    var data = {
      name: this.state.currentRecipe.name,
      amount: 0
    }
    ShopDataService.create(data)
      .then(res => {
        this.setState({
          id: res.data.id,
          name: res.data.name,
          amount: res.data.amount,
          // submitted: true,
          message: 'Shop Added successfully!',

        });
        console.log(res.data);
      })
      .catch(e => {
        console.log(e.response);
      });
    console.log('added to shop', this.state.shoplist);
  }



  render() {
    const { recipes, currentRecipe, currentIndex, isClicked } = this.state;
    // const img = this.state.imageUrl;
    return (
      //   this.state.clickedAddtoShop ? <Shopping shoplist={this.state.shoplist}/> :
      // [
      <div className="list row">
        <div className="col-md-6">
          <button
            className="m-3 btn btn-sm btn-success"
            onClick={this.handleClick}
          >
            Add New Recipe
          </button>
          <h4>Recipe List</h4>

          <ul className="list-group">
            {recipes &&
              recipes.map((recipe, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveRecipes(recipe, index)}
                  key={index}
                >
                  {recipe.name}<br />
                  {/* {recipe.description} */}
                </li>
              ))}
          </ul>


        </div>
        <div className="col-md-6">
          {currentRecipe ? (
            <div>
              <h3>Recipe</h3>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentRecipe.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentRecipe.description}
              </div>
              <div>
                <label>
                  <strong>Ingredients:</strong>
                </label>{" "}
                {currentRecipe.ingredients}
              </div>
              <div>
                <img
                  id="imageUrl"
                  src={currentRecipe.imageUrl}
                  alt="Recipe image"
                  height="300px"
                  width='350px'
                  name="imageUrl"
                />
              </div>

              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Manage Recipe
            </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href={"/recipes/" + currentRecipe.id}>Edit Recipe</Dropdown.Item>
                  <Dropdown.Item onClick={this.deleteRecipe}>Delete Recipe</Dropdown.Item>
                  {/* <Dropdown.Item onClick={this.addtoShop}> <Redirect to={{pathname:"/shopping", state:{shoplist: this.state.shoplist}}}/>To shopping list </Dropdown.Item> */}
                  <Dropdown.Item onClick={this.addtoShop}> To shopping list </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <h5><br /> {this.state.message} </h5>
              {/* {this.state.clickedAddtoShop ? <Shopping shoplist={this.state.shoplist} handleShopDelete={this.handleShopDelete} count={this.state.currentShop.count}/> : <></>} */}
              {/* {isClicked?  <Shopping shoplist={this.state.shoplist}/> : <></>} */}
              {/* <p> Hello {this.state.shoplist}   </p> */}
            </div>

          ) :

            [
              (isClicked ? <> <Recipes />
                
                {/* {this.handleBack()} */}
                {/* <button
                    className="m-3 btn btn-sm btn-success"
                    onClick={this.handleBack}>
                    Back
                  </button> */}
              </>
                :
                <div>
                  <br />
                  <p style={{ fontSize: "25px" }}><b> Please Select A Recipe!</b></p>
                </div>)
            ]
          }
        </div>
      </div>
      // ]
    )
  }
}
export default ListRecipe;
