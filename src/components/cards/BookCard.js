import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Image,
  Icon,
  Progress,
  Confirm,
  Button
} from "semantic-ui-react";
import ProgressForm from "../forms/ProgressForm";
import "./BookCard.css";

class BookCard extends React.Component {
  state = {
    showForm: false,
    iconClass: "",
    open: false,
    delete: false,
    cardClass: "",
    formClass: ""
  };

  showProgressForm = () =>
    this.state.showForm
      ? this.setState({
          showForm: !this.state.showForm,
          iconClass: "arrowIconDown"
        })
      : this.setState({
          showForm: !this.state.showForm,
          iconClass: "arrowIconUp",
          formClass: "formClassDown"
        });

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  confirmBookDelete = book => {
    this.close();
    this.setState({ cardClass: "bookCardDelete" });
    this.props.delete({
      goodreadsId: book.goodreadsId,
      id: book._id
    });
  };

  render() {
    const { book, progress } = this.props;

    return (
      <Card id="bookCard" className={this.state.cardClass} size="large">
        <Card.Content textAlign="right">
          <Icon id="showme" name="delete" size="large" onClick={this.open} />
          <Confirm
            id="confrimDelete"
            open={this.state.open}
            onCancel={this.close}
            onConfirm={() => this.confirmBookDelete(book)}
          />
        </Card.Content>
        <Card.Content id="imgContainer">
          <Image src={book.cover} />
        </Card.Content>
        <Card.Content>
          <Card.Header>{book.title}</Card.Header>
          <Card.Meta>
            <span className="date">By {book.authors}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Icon name="book" />
          {book.pages} Pages
        </Card.Content>
        <Card.Content extra>
          <Progress percent={progress} progress />
          You finished {book.progress} Pages
        </Card.Content>
        <Card.Content textAlign="center">
          <Button id="showProgressButton" onClick={this.showProgressForm}>
            <Icon
              id="arrowIcon"
              className={this.state.iconClass}
              name="minus"
              size="huge"
            />
          </Button>
        </Card.Content>
        <Card.Content extra>
          {this.state.showForm ? (
            <ProgressForm
              className={this.state.formClass}
              book={book}
              submit={this.props.submit}
              showForm={this.showProgressForm}
            />
          ) : null}
        </Card.Content>
      </Card>
    );
  }
}

BookCard.propTypes = {
  submit: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
  book: PropTypes.shape({
    goodreadsId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    pages: PropTypes.number
  }).isRequired
};
export default BookCard;
