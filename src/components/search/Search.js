import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";
import ImageResults from "../image-results/imageResults";

class Search extends Component {
  state = {
    searchText: "",
    amount: 15,
    apiUrl: "https://pixabay.com/api",
    apiKey: "8399762-01552a1174af45b11334c4f6d",
    images: []
  };

  onTextChange = e => {
    const searchTextValue = e.target.value;
    const searchTextName = e.target.name;

    const imageGetter = () => {
      const { apiUrl, apiKey, searchText, amount } = this.state;
      if (searchTextValue === "") {
        this.setState({images: []})
      } else {
        axios
        .get(
          `${apiUrl}/?key=${apiKey}&q=${searchText}&image_type=photo&per_page=${amount}&safesearch=true`
        )
        .then(res => this.setState({ images: res.data.hits }))
        .catch(err => console.log(err));
      }
    };

    this.setState({ [searchTextName]: searchTextValue }, imageGetter());
    // console.log(this.state.images);
  };

  onAmountChange = (e, index, value) => {
    this.setState({ amount: value });
  };

  render() {
    const { images } = this.state;
    return (
      <div className='search'>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search Images"
          fullWidth={true}
        />
        <br />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        <br />

        {images.length > 0 ? <ImageResults images={images} /> : null}
      </div>
    );
  }
}

export default Search;
