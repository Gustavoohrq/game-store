import React, { useState, useRef } from 'react';
import { StatusBar } from "react-native";
import styled from 'styled-components';

import Text from '../Text';
import categoryList from '../../utils/categories';
import games from '../../utils/gameData'

export default HomeScreen = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState("Todas");
    const gamesRef = useRef()
    const changeCategory = (category) => {
        setSelectedCategory(category)
        gamesRef.current.scrollToOffset({ x: 0, y: 0 });
    };

    const GameItem = (game) => {
        return (
            <Game onPress={() => navigation.navigate("GameScreen", { game: game })}>
                <GameCover source={{ uri: `${game.cover}` }} />
                <GameInfo backgroundColor={game.backgroundColor}>
                    <GameImage source={{ uri: `${game.cover}` }} />
                    <GameTitle>
                        <Text medium bold>{game.title}</Text>
                        <Text small>{game.teaser}</Text>
                    </GameTitle>
                </GameInfo>

            </Game>

        )
    }

    return (
        <Container>
            <StatusBar barStyle="light-content" />
            <Header>
                <Text large>Olá, <Text large bold >Gustavo.</Text>
                    {`\n`}
                    <Text large bold >Os melhores jogos para hoje.</Text>
                </Text>

                <Avatar source={{
                    uri: 'https://avatars0.githubusercontent.com/u/47986830?s=460&u=d44a5fd4ef0d4e943315daf38c8efb7e438b12f8&v=4',
                }} />

            </Header>

            <Categories horizontal={true} showsHorizontalScrollIndicator={false} >
                {categoryList.map((category, index) => {
                    return (
                        <Category key={index} onPress={() => changeCategory(category)}>
                            <CategoryName selected={selectedCategory === category ? true : false} >{category}</CategoryName>
                            {selectedCategory === category && <CategoryDot />}
                        </Category>
                    );
                })}
            </Categories>

            <Games
                data={games.filter(game => {
                    return game.category.includes(selectedCategory) || selectedCategory === "Todas";
                })}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => GameItem(item)}
                ref={gamesRef}
            />

        </Container>
    );
};

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #343434;
`;

const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 16px 15px 0 15px;

`;

const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 100px;
`

const Categories = styled.ScrollView`
    margin-top:32px;
    flex-grow:0;
`;

const Category = styled.TouchableOpacity`
    align-items: center;
    margin: 0 16px;
    height: 32px;
`;

const CategoryName = styled(Text)`
    color: ${props => (props.selected ? "#819ee5" : "#9a9a9a")};
    font-weight: ${props => (props.selected ? "700" : "500")};
`;

const CategoryDot = styled.View`
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: #819ee5;
`;

const Games = styled.FlatList`
    margin-top: 32px;
    flex: 1;

`;

const Game = styled.TouchableOpacity`
    margin-bottom: 32px;
`;

const GameCover = styled.Image`
    height: 300px;
    width: 100%;
`;

const GameInfo = styled.View`
    margin: -50px 16px 0 16px;
    padding: 16px;
    border-radius: 12px;
    flex-direction: row;
    align-items: center;
`;

const GameImage = styled.Image`
    width: 50px;
    height: 40px;
    border-radius: 8px;
`;

const GameTitle = styled.View`
    margin: 0 24px;
`;