// @flow
import { DataSource } from 'apollo-datasource'

import Project from '../models/Project'

export default class ProjectAPI extends DataSource {

  initialize (config) {
    this.context = config.context
    this.user = this.context.user || null
  }

  async createProject (project): string {
    return Project.create({ owner: this.user._id, ...project })
  }
}
