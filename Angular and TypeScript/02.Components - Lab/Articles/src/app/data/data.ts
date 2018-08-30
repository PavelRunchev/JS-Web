import data from './seed';
import Article from '../model/Article';

export class ArticleData {
    getData() : Article[] {
        let articles : Article[] = [];

        for (let index = 0; index < data.length; index++) {
            articles[index] = new Article(data[index].title, 
                data[index].description, data[index].author, data[index].imageUrl);
            
        }
        return articles;
    }
} 