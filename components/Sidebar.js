import { Avatar, Button, IconButton } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/chat";
import MoreVertIcon from "@material-ui/icons/morevert";
import SearchIcon from "@material-ui/icons/search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Sidebar() {
    const [user] = useAuthState(auth);

    const createChat = () => {
        const input = prompt(
            "Please enter an email address for the user you wish to chat with"
        );

        if (!input) return;

        if (
            EmailValidator.validate(input)
        ) {
            db.collection("chats").add({
                users: [user.email, input],
            });
        }
    };



    return (
        <Container>
            <Header>
                <UserAvatar onClick={() => auth.signOut()} />

                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>

            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in Chats" />
            </Search>

            <SidebarButton onClick={createChat}>
                Start a new chat
            </SidebarButton>

            {/* {List of chats} */}
        </Container>
    )
};



export default Sidebar;

const Container = styled.div`

`;


const Search = styled.div`
display: flex;
align-items: center;
padding: 20px;
border-radius: 2px;
`;

const SidebarButton = styled(Button)`
width: 100%;
&&& {
    border-bottom: 1px solid lightcyan;
    border-top: 1px solid lightcyan;
}
`;

const SearchInput = styled.input`
outline-width: 0;
border: none;
flex: 1;
`;

const Header = styled.div`
display: flex;
position: sticky;
top: 0;
background-color: lightblue;
z-index: 1;
justify-content: space-between;
align-items: center;
padding: 15px;
height: 80px;
border-bottom: 1px solid lightcyan;
`;

const UserAvatar = styled(Avatar)`
cursor: pointer;
:hover {
    opacity: 0.8;
}
`;

const IconsContainer = styled.div``;