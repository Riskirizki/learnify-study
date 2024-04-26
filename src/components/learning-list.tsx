import React, { useState } from "react";
import styled from "styled-components";
import { learningList } from "../data/learning-list";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Form = styled.form`
  margin-bottom: 30px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

export function LearningList() {
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState(learningList);
  const [newItemTitle, setNewItemTitle] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value.toLowerCase());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newItemTitle.trim()) return;

    const lastId = items.length > 0 ? items[items.length - 1].id : 0;
    const newItem = {
      id: lastId + 1,
      title: newItemTitle.trim(),
      isDone: false,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setNewItemTitle("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemTitle(event.target.value);
  };

  const filteredItems = items.filter((learningItem) =>
    learningItem.title.toLowerCase().includes(keyword)
  );

  return (
    <Container>
      <Title>Welcome to Learnify Study!</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="newItem">Add New Item</Label>
        <Input
          type="text"
          id="newItem"
          name="newItem"
          placeholder="Enter new item title"
          value={newItemTitle}
          onChange={handleInputChange}
          required
        />
        <Button type="submit">Add Item</Button>
      </Form>
      <div>
        <Label htmlFor="keyword">Search</Label>
        <Input
          type="text"
          id="keyword"
          name="q"
          placeholder="Search learning items..."
          onChange={handleSearchChange}
        />
      </div>
      <hr />
      <List>
        {filteredItems.map((learningItem) => (
          <ListItem key={learningItem.id}>{learningItem.title}</ListItem>
        ))}
      </List>
    </Container>
  );
}
