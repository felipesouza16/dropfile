// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import DropFileLayout from 'src/layouts/DropfileLayout'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="PostFiles" titleTo="postFiles" buttonLabel="New PostFile" buttonTo="newPostFile">
        <Route path="/post-files/new" page={PostFileNewPostFilePage} name="newPostFile" />
        <Route path="/post-files/{id:Int}/edit" page={PostFileEditPostFilePage} name="editPostFile" />
        <Route path="/post-files/{id:Int}" page={PostFilePostFilePage} name="postFile" />
        <Route path="/post-files" page={PostFilePostFilesPage} name="postFiles" />
      </Set>
      <Set wrap={DropFileLayout}>
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
