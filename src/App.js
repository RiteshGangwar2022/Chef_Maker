import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

import logo from "./logo.jpg";
import search from "./search.jpeg";



const RecipeContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    width: 400px;
    box-shadow: rgb(170, 170, 170) 0px 10px 20px 0px;
    border-radius: 15px;
    background: white;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 300px;
  border-radius: 10px;
`;
const RecipeName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align:center;
`;
const SeeMoreText = styled.span`
  color: red;
  font-size: 18px;
  text-align: center;
  border: solid 1px red;
  border-radius: 3px;
  padding: 10px 15px;
  cursor: pointer;
  background-color:rgb(239, 154, 154);
  border-radius:10px;
`;
const IngredientsText = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
  margin-bottom: 12px;
  background:rgb(197, 225, 165);
  border-radius: 10px;
`;
const SeeNewTab = styled(SeeMoreText)`
  color: red;
  border: solid 1px green;
  border-radius: 10px;
  background:rgb(239, 154, 154);
`;
const RecipeComponent = (props) => {
  const [show, setShow] = useState("");

  const { label, image, ingredients, url } = props.recipe;
  return (
    <RecipeContainer>
      <Dialog
        onClose={() => { }}
        aria-labelledby="simple-dialog-title"
        open={!!show}
      >
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <RecipeName>{label}</RecipeName>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.text}</td>
                  <td>{ingredient.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <SeeNewTab onClick={() => window.open(url)}>See More</SeeNewTab>
          <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
        </DialogActions>
      </Dialog>
      <CoverImage src={image} alt={label} />
      <RecipeName>{label}</RecipeName>
      <IngredientsText onClick={() => setShow(!show)}>
        Ingredients
      </IngredientsText>
      <SeeMoreText onClick={() => window.open(url)}>
        See Complete Recipe
      </SeeMoreText>
    </RecipeContainer>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color:rgb(116, 156, 56);
  height:80px;
`;

const Header = styled.div`
  background-color:rgb(69, 90, 100);;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 8px;
  width: 40%;
  background-color: white;;
`;
const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;
const RecipeImage = styled.img`
  width: 90px;
  height: 60px;
  margin: 15px;
  border-radius:10px;
`;
const Placeholder = styled.div`
  margin:auto 30px;
  position:relative;
  top:100px;
  color:white;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  width:"50%"
`;

const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
  justify-content: space-evenly;
  background-color:#546e7a;
`;
const AppComponent = () => {
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const fetchData = async (searchString) => {
  
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    updateRecipeList(response.data.hits);
  };

  useEffect(() => {
    fetchData("cheese");
  }, []);
  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName className="appname">
          <RecipeImage src={logo} />
           <h3>Recipes</h3>
        </AppName>
        <SearchBox>
          <SearchIcon src={search} />
          <SearchInput
            placeholder="Search Recipe"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      <RecipeListContainer>
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <Placeholder src="/react-recipe-finder/hamburger.svg" />
        )}
      </RecipeListContainer>
    </Container>
  );
};

export default AppComponent;
