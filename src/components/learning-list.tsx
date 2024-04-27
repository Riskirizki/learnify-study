import React, { useState } from "react";
import styled from "styled-components";
import { learningList } from "../data/learning-list";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 90%;
  max-width: 800px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const Form = styled.form`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 1.1rem;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  padding: 8px 16px;
  width: 100px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

const SearchInput = styled(Input)`
  margin-bottom: 0;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  const removeLearningItemById = (idToRemove: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== idToRemove));
  };

  const filteredItems = items.filter((learningItem) =>
    learningItem.title.toLowerCase().includes(keyword)
  );

  return (
    <Container>
      <ContentWrapper>
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
          <Button type="submit">Add</Button>
        </Form>
        <Form>
          <Label htmlFor="keyword">Search</Label>
          <SearchInput
            type="text"
            id="keyword"
            name="q"
            placeholder="Search learning items..."
            onChange={handleSearchChange}
          />
        </Form>
        <hr />
        <List>
          {filteredItems.map((learningItem) => (
            <ListItem key={learningItem.id}>
              {learningItem.title}
              <Button onClick={() => removeLearningItemById(learningItem.id)}>
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
      </ContentWrapper>
    </Container>
  );
}
