"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const address_entity_1 = require("../entities/address.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const company_entity_1 = require("../entities/company.entity");
let AddressesService = class AddressesService {
    constructor(addressRepository, companyRepository) {
        this.addressRepository = addressRepository;
        this.companyRepository = companyRepository;
    }
    createOrUpdateAddress(currentCompany, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let company = currentCompany;
            if (data.companyId) {
                company = yield this.companyRepository.findOne({ id: data.companyId });
                if (!company) {
                    throw new common_1.HttpException('api.error.company.not_found', common_1.HttpStatus.NOT_FOUND);
                }
                delete data.companyId;
            }
            data.company = company;
            if (data.id) {
                const address = yield this.addressRepository.findOne({ id: data.id });
                if (!address) {
                    throw new common_1.HttpException('api.error.address.not_found', common_1.HttpStatus.NOT_FOUND);
                }
                delete data.id;
                this.addressRepository.merge(address, data);
                return this.addressRepository.save(address);
            }
            return this.addressRepository.save(this.addressRepository.create(data));
        });
    }
    removeAddress(company, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!company) {
                throw new common_1.HttpException('api.error.company.not_found', common_1.HttpStatus.NOT_FOUND);
            }
            const address = yield this.addressRepository.findOne({ id });
            if (!address) {
                throw new common_1.HttpException('api.error.address.not_found', common_1.HttpStatus.NOT_FOUND);
            }
            yield this.addressRepository.remove(address);
            return address;
        });
    }
    findByCompany(company, orderBy, limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.addressRepository.find({
                where: { company },
                skip: offset,
                take: limit,
            });
        });
    }
    countByCompany(company) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.addressRepository.count({ company });
        });
    }
};
AddressesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(address_entity_1.Address)),
    __param(1, typeorm_2.InjectRepository(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], AddressesService);
exports.AddressesService = AddressesService;
//# sourceMappingURL=addresses.service.js.map