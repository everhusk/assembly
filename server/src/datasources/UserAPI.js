// @flow
import ethWallet from 'ethereumjs-wallet'
import TokenGenerator from 'uuid-token-generator'
import { DataSource } from 'apollo-datasource'

import User from '../models/User'

export default class UserAPI extends DataSource {

  initialize (config) {
    this.context = config.context
    this.user = this.context.user || null
  }

  async me () {
    return User.findOne({ _id: this.user.id })
  }

  async updateProfile ({ firstName, lastName, email, twitter, github }): string {
    await User.update({ address: this.user.address }, { firstName, lastName, email, twitter, github })
    return firstName
  }

  async generateToken (privateKey: string): ?string {
    let wallet
    try {
      wallet = ethWallet.fromPrivateKey(
        Buffer.from(
          new Uint8Array(privateKey.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))),
        ),
      )
    } catch (e) {
      return null
    }
    const buf2hex = (buffer) => {
      return Array.prototype.map
        .call(new Uint8Array(buffer), (x) => `00${x.toString(16)}`.slice(-2)).join('')
    }
    const address = buf2hex(wallet.getAddress())
    const generator = new TokenGenerator(256, TokenGenerator.BASE62)
    const token = generator.generate()

    await User.update({ address }, { address, token, tokenCreatedAt: new Date() }, { upsert: true })

    return new Buffer(token).toString('base64')
  }
}
