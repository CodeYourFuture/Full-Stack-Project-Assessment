import { Injectable } from '@nestjs/common';
import { UrlInterface } from '../controller/interface/interfaceUrl'

import data from './exampleresponse.json';
const dataVariable: any = [];

const allData=[...data, ...dataVariable]

@Injectable()
export class AppService {
  getHello(): UrlInterface[] {
    return allData;
  }
  postUrl(value) {
    allData.push({ ...value, id: allData.length });
    return { id: allData[allData.length - 1].id };
  }
  getById(id): UrlInterface[] {
    return allData.filter((v)=>v.id===Number(id))
  }
  deleteById(id):string {
    const index = allData.findIndex((v) => v.id === Number(id))
    console.log(index)
    if (index>=0) {
      allData.splice(index, 1);
      console.log(allData);
      return 'Deleted';
    }
    return 'Item not found'
    
  }
}
