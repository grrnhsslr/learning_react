// import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostCard from '../components/PostCard';
import { PostType } from '../types';


type Sorting = {
    idAsc: (a: PostType, b:PostType) => number,
    idDesc: (a: PostType, b:PostType) => number,
    titleAsc: (a: PostType, b:PostType) => number,
    titleDesc: (a: PostType, b:PostType) => number,
}


type HomeProps = {
    isLoggedIn: Boolean,
    handleClick: () => void
}

export default function Home({isLoggedIn, handleClick   }: HomeProps) {

    const [posts, setPosts] = useState<PostType[]>([
        {
            author: {
                dateCreated: "Fri, 29 Mar 2024 16:58:44 GMT",
                email: "Garrens@codingtemple.com",
                firstName: "Garren",
                id: 1,
                lastName: "hassler",
                username: "ghassler"
            },
            body: "We are alive!!!!!!",
            dateCreated: "Fri, 29 Mar 2024 17:00:35 GMT",
            id: 1,
            title: "Alive"
        },
        {
            author: {
                dateCreated: "Tue, 14 Apr 2024 16:58:44 GMT",
                email: "Garrens@codingtemple.com",
                firstName: "Garren",
                id: 2,
                lastName: "hassler",
                username: "ghassler"
            },
            body: "I love React!",
            dateCreated: "Tue, 16 Apr 2024 17:00:35 GMT",
            id: 1,
            title: "React"
        },
    ])

    const [searchTerm, setSearchTerm] = useState('');

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const sortFunctions:Sorting = {
            idAsc: (a:PostType, b:PostType) => a.id - b.id,
            idDesc: (a:PostType, b:PostType) => b.id - a.id,
            titleAsc: (a:PostType, b:PostType) => a.title > b.title ? 1 : -1,
            titleDesc: (a:PostType, b:PostType) => b.title > a.title ? 1 : -1
        }
        const func = sortFunctions[e.target.value as keyof Sorting];
        const newSortedArr = [...posts].sort(func);
        setPosts(newSortedArr);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    // how to display the navbar without the Navigation.tsx

    // return React.createElement(React.Fragment, {}, React.createElement(Navigation, { isLoggedIn }, undefined), React.createElement(Container, {}, React.createElement('h1', {}, 'Hello World')))

    return (
        <>
            <h1>Hello World</h1>
                <Button variant='primary' onClick={handleClick}>Click Me!</Button>
                <h2>{isLoggedIn ? `Welcome Back` : 'Please Log In or Sign Up'}</h2>
                <Row>
                    <Col xs={12} md={8}>
                        <Form.Control value={searchTerm} placeholder='Search Posts' onChange={handleInputChange} />
                    </Col>
                    <Col>
                        <Form.Select onChange={handleSelectChange}>
                            <option>Choose Sorting Option</option>
                            <option value="idAsc">Sort By ID ASC</option>
                            <option value="idDesc">Sort By ID DESC</option>
                            <option value="titleAsc">Sort By Title ASC</option>
                            <option value="titleDesc">Sort By Title DESC</option>
                        </Form.Select>
                    </Col>
                </Row>
                {posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map( p => <PostCard key={p.id} post={p} /> )}
        </>
    )
}
