import React, { Component } from 'react';
import RecipeDataService from '../services/recipe.service';

class UpdateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRecipe: {
        id: null,
        name: '',
        imageUrl: '',
        description: '',
        ingredients: '',
      },
      message: ""
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeIngredients = this.onChangeIngredients.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
    this.getRecipe = this.getRecipe.bind(this);
  }
  componentDidMount() {
    this.getRecipe(this.props.match.params.id);
  }
  onChangeName(e) {
    const name = e.target.value;
    this.setState(function (prevState) {
      return {
        currentRecipe: {
          ...prevState.currentRecipe,
          name: name
        }
      };
    });
  }
  onChangeImage(e) {
    const image = e.target.value;
    this.setState(function (prevState) {
      return {
        currentRecipe: {
          ...prevState.currentRecipe,
          imageUrl: image
        }
      };
    });
  }
  onChangeDescription(e) {
    const desc = e.target.value;
    this.setState(function (prevState) {
      return {
        currentRecipe: {
          ...prevState.currentRecipe,
          description: desc
        }
      };
    });
  }
  onChangeIngredients(e) {
    const ingred = e.target.value;
    this.setState(function (prevState) {
      return {
        currentRecipe: {
          ...prevState.currentRecipe,
          ingredients: ingred
        }
      };
    });
  }

  getRecipe(id) {
    RecipeDataService.get(id)
      .then(response => {
        this.setState({
          currentRecipe: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  updateRecipe() {
    RecipeDataService.update(
      this.state.currentRecipe.id,
      this.state.currentRecipe
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Recipe updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { currentRecipe } = this.state;

    return (
      <div>
        {currentRecipe ? (
          <div className="edit-form">
            <h4>Recipe</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={currentRecipe.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="imageUrl">Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="imageUrl"
                  required
                  value={currentRecipe.imageUrl}
                  onChange={this.onChangeImage}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={currentRecipe.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Ingredients</label>
                <input
                  type="text"
                  className="form-control"
                  id="ingredients"
                  required
                  value={currentRecipe.ingredients}
                  onChange={this.onChangeIngredients}
                />
              </div>
            </form>

            <button
              className="btn btn-primary mr-2 mb-3"
            // onClick={b}
            > <a href="/recipes/" className="btn-primary"> Back</a>

            </button>

            <button
              type="submit"
              className="btn btn-success mb-3"
              onClick={this.updateRecipe}
            >
              Update
                </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
            <div>
              <br />
              <p>Please click on a Recipe...</p>
            </div>
          )}
      </div>
    );

  }
}
export default UpdateRecipe;