import { Controller, Get } from "@nestjs/common";


@Controller()
export class OnlineUSerController {
    constructor () {}
    
    @Get("/")
    async findAll() {

    }
}