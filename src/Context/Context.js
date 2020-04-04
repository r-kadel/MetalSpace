import React, { useState } from "react"
import pic from "../assets/stockuser.png"

const Context = React.createContext()

const demoPosts = [
  { postContent: "first Post!", id: 2 },
  { postContent: "Another new post", id: 3 },
  { postContent: "This site is the worst!", id: 4 },
]

const demoComments = [
  { content: "Weak post", postId: 2, id: 1 },
  { content: "Not a terrible post", postId: 3, id: 1 },
  { content: "Strong agree", postId: 2, id: 2 },
]

function ContextProvider(props) {
  const [userPosts, setUserPosts] = useState(demoPosts)
  const [loggedIn, setLoggedIn] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showLogin, setShowLogin] = useState(false)
  const [userComments, setUserComments] = useState(demoComments)
  const [showUpload, setShowUpload] = useState(false)
  const [showComment, setShowComment] = useState("")
  const [profilePic, setProfilePic] = useState(pic)

  return (
    <Context.Provider
      value={{
        userPosts,
        setUserPosts,
        loggedIn,
        setLoggedIn,
        hasError,
        setHasError,
        errorMessage,
        setErrorMessage,
        showLogin,
        setShowLogin,
        userComments,
        setUserComments,
        showUpload,
        setShowUpload,
        showComment,
        setShowComment,
        profilePic,
        setProfilePic,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
