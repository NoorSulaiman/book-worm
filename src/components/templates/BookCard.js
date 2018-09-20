import React from 'react';
import { Card, Image, Icon, Progress } from 'semantic-ui-react';
import ProgressForm from '../forms/ProgressForm';
import './BookCard.css'

class BookCard extends React.Component {

    state = {
        showForm: false,
        class: ''
    }
    showProgressForm = () => {
        this.state.showForm ? this.setState({ showForm: !this.state.showForm, class: 'arrowIconDown' })
            : this.setState({ showForm: !this.state.showForm, class: 'arrowIconUp arrowIcon' })
    }



    render() {
        const { book, progress } = this.props;


        return (
            <Card id='bookCard' size='large'>
                <Card.Content textAlign="right">
                    <Icon
                        id='showme'
                        name='delete'
                        size='large'
                        onClick={() => this.props.delete({ goodreadsId: book.goodreadsId, userId: book.userId, id: book._id })}>
                    </Icon>
                </Card.Content>
                <Image src={book.cover} />
                <Card.Content>
                    <Card.Header>{book.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>By {book.authors}</span>
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='book' />
                    {book.pages} Pages
            </Card.Content>
                <Card.Content extra>
                    <Progress percent={progress} progress />
                    You finished {book.progress} Pages
                </Card.Content>
                <Card.Content textAlign='center'>
                    <Icon
                        className={this.state.class}
                        name='arrow circle down'
                        size='huge'
                        onClick={() => this.showProgressForm()}
                    />
                </Card.Content>
                <Card.Content extra>
                    {this.state.showForm ? <ProgressForm book={book} submit={this.props.submit} showForm={this.showProgressForm} /> : null}
                </Card.Content>
            </Card >
        );
    }
}

export default BookCard;