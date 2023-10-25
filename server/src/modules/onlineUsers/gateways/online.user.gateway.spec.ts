import { Test, TestingModule } from '@nestjs/testing';
import { OnlineUserGateway } from './onlineUser.gateway';
import { OnlineUserService } from '../../user/services/onlineUser.service';

describe('OnlineUserGateway', () => {
  let gateway: OnlineUserGateway;
  let onlineUserService: OnlineUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OnlineUserGateway,
        OnlineUserService, // Mock or provide a testing version of the OnlineUserService if needed
      ],
    }).compile();

    gateway = module.get<OnlineUserGateway>(OnlineUserGateway);
    onlineUserService = module.get<OnlineUserService>(OnlineUserService);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('handleConnection', () => {
    it('should handle client connection and add an online user', async () => {
      // Mock the Socket and user objects
      const client = { request: { user: { id: 123 } } } as any;
      const user = { id: 123 };

      const addOnlineUserSpy = jest.spyOn(onlineUserService, 'addOnlineUser');

      await gateway.handleConnection(client, user);

      // Expect that the addOnlineUser method was called with the user ID
      expect(addOnlineUserSpy).toHaveBeenCalledWith(user.id);
    });
  });

  describe('handleDisconnect', () => {
    it('should handle client disconnection and add an online user', async () => {
      // Mock the Socket object
      const client = {} as any;
      client.request = { user: { id: 123 } };

      const addOnlineUserSpy = jest.spyOn(onlineUserService, 'addOnlineUser');

      await gateway.handleDisconnect(client);

      // Expect that the addOnlineUser method was called with the user ID
      expect(addOnlineUserSpy).toHaveBeenCalledWith(client.request.user.id);
    });
  });

  describe('handleMessage', () => {
    it('should handle a message and return "Hello world!"', () => {
      const payload = 'Test Message';
      const client = {}; // You can mock the client object as needed

      const response = gateway.handleMessage(client, payload);

      // Expect the response to be "Hello world!"
      expect(response).toBe('Hello world!');
    });
  });
});



// import * as WebSocket from 'ws'

// describe('AuthService', () => {

//     beforeAll(async () => {
//         const moduleFixture = await Test.createTestingModule({
//             imports: [
//             SocketModule,
//             ],
//         }).compile()

//         app = moduleFixture.createNestApplication()
//         app.useWebSocketAdapter(new WsAdapter(app))
//         await app.init()
//     })

//     it('should connect successfully', (done) => {
//         const address = app.getHttpServer().listen().address()
//         const baseAddress = `http://[${address.address}]:${address.port}`

//         const socket = new WebSocket(baseAddress)

//         socket.on('open', () => {
//             console.log('I am connected! YEAAAP')
//             done()
//         })

//         socket.on('close', (code, reason) => {
//             done({ code, reason })
//         })
//         socket.on ('error', (error) => {
//             done(error)
//         })
//     })
// }