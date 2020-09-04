import React, { Component } from 'react';
import RecipeDataService from '../services/recipe.service';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      imageUrl: '',
      description: '',
      ingredients: '',

      isClicked: false,
      submitted: false,
      isClickedIngredient: false,
      message: '',
  
      errors:{}
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeIngredient = this.onChangeIngredient.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.newRecipe = this.newRecipe.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleClickedIngredient = this.handleClickedIngredient.bind(this);
    this.submitForm=this.submitForm.bind(this);
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeImage(e) {
    this.setState({
      imageUrl: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeIngredient(e) {
    this.setState({
      ingredients: e.target.value
    });
  }
  submitForm(e){
    // e.preventDefault();
    if(this.validateForm()){
      this.setState({
        name:'',
        imageUrl:'',
        description:'',
        ingredients:''
      });
      alert("Recipe added successfully");
    }
  }

  validateForm(){
    let errors= {};
    let formValid=true;

    if(!this.state.name){
      formValid=false;
      errors["nameError"]="Name Can't be null";
    }
    if(typeof this.state.name !== 'undefined'){
      if(!this.state.name.match(/^[a-zA-Z]*$/)){
        formValid=false;
        errors["nameError"]="Please enter alphabet character only";
      }
    }
    if(!this.state.imageUrl){
      formValid=false;
      errors["imageError"]="image Url Can't be null";
    }
    if(!this.state.description){
      formValid=false;
      errors["descriptionError"]="Description Can't be null";
    }
    
    this.setState({
      errors: errors
    });

    return formValid;
  }
  addRecipe() {
    var data = {
      name: this.state.name,
      imageUrl: this.state.imageUrl,
      description: this.state.description,
      ingredients: this.state.ingredients,
    };
    const isValid = this.submitForm();
    // if (!isValid) {
    //   console.log(this.state);
    //   return false;
    // }
    // if(isValid){}
    RecipeDataService.create(data)
      .then(res => {
        this.setState({
          id: res.data.id,
          name: res.data.name,
          imageUrl: res.data.imageUrl,
          description: res.data.description,
          ingredients: res.data.ingredients,

          submitted: true,
          message: 'Recipe Added successfully!',
          isClickedIngredient: false
        });
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newRecipe() {
    this.setState({
      id: null,
      name: '',
      imageUrl: '',
      description: '',
      ingredients: '',
      submitted: false,
      isClickedIngredient: false
    });
  }
  handleCancel() {
    this.setState({
      submitted: true,
      message: 'Returned',
      isClickedIngredient: false
    });
  }
  handleClickedIngredient() {
    this.setState({
      isClickedIngredient: true
    })
  }

  render() {
    return (
      
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>{this.state.message} </h4>
            <button className="btn btn-success" onClick={this.newRecipe}>
              Add New Recipe
            </button>
          </div>
        ) : (
            <div>
              <form>      
              <button onClick={this.addRecipe} className="btn btn-success mr-2">
                Submit
            </button>
              <button onClick={this.handleCancel} className="btn btn-danger">
                Cancel
            </button>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.name}
                  onChange={this.onChangeName}
                  name="name"
                />
              </div>
                <div style={{ color: "red" }}> {this.state.errors.nameError} </div>

              <div className="form-group">
                <label htmlFor="imageUrl">Image URL: </label>
                <input
                  type="text"
                  className="form-control"
                  id="imageUrl"
                  required
                  value={this.state.imageUrl}
                  onChange={this.onChangeImage}
                  name="imageUrl"
                />
              </div>
              <div style={{ color: "red" }}> {this.state.errors.imageError} </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  type="textarea"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>
              <div style={{ color: "red" }}> {this.state.errors.descriptionError} </div>

              {
                this.state.isClickedIngredient ?
                  (<div className="form-group">
                    <label htmlFor="ingredients">Ingredients</label>
                    <input
                      type="text"
                      className="form-control"
                      id="ingredients"
                      required
                      value={this.state.ingredients}
                      onChange={this.onChangeIngredient}
                      name="ingredients" />
                  </div>
                  )
                  : (<button onClick={this.handleClickedIngredient} className="btn btn-success">
                    Add ingredients
                  </button>
                  )
              }
              </form>
            </div>
          )}
      </div>
    );


  }
}
export default Recipes;