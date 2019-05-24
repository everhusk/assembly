// @flow
import App from './App'
import Dashboard from './Dashboard'
import MissionsPage from './missions/MissionsPage'
import MissionPage from './mission/MissionPage'
import ProjectPage from './project/ProjectPage'
import FundPage from './project/FundPage'
import CreateProjectPage from './project/CreateProjectPage'
import ProfilePage from './profile/ProfilePage'
import EditProfilePage from './profile/EditProfilePage'
import NotFoundPage from './NotFoundPage'

export default [
  {
    component: App,
    routes: [
      {
        component: Dashboard,
        routes: [
          {
            path: '/missions',
            component: MissionsPage,
            exact: true,
          },
          {
            path: '/missions/:id',
            component: MissionPage,
            exact: true,
          },
          {
            path: '/projects/:id',
            component: ProjectPage,
            exact: true,
          },
          {
            path: '/projects/:id/fund',
            component: FundPage,
            exact: true,
          },
          {
            path: '/project/create',
            component: CreateProjectPage,
            exact: true,
          },
          {
            path: '/profile',
            component: ProfilePage,
            exact: true,
          },
          {
            path: '/profile/edit',
            component: EditProfilePage,
            exact: true,
          },
          {
            component: NotFoundPage,
          },
        ],
      },
      {
        component: NotFoundPage,
      },
    ],
  },
]
