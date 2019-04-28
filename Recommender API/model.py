# Importing the libraries
import pandas as pd
from IPython.display import Image, HTML
import matplotlib.pyplot as plt
#from wordcloud import WordCloud, STOPWORDS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import pickle
#from model import recommend

listings = pd.read_csv(r'C:\Users\kamat\Downloads\seattle\listings.csv', usecols = ['id', 'name', 'description'])
#print(listings)
listings['content'] = listings[['name', 'description']].astype(str).apply(lambda x: ' // '.join(x), axis = 1)
listings['content'].fillna('Null', inplace = True)
tf = TfidfVectorizer(analyzer = 'word', ngram_range = (1, 2), min_df = 0, stop_words = 'english')
tfidf_matrix = tf.fit_transform(listings['content'])
cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)
results = {}
for idx, row in listings.iterrows():
    similar_indices = cosine_similarities[idx].argsort()[:-100:-1]
    similar_items = [(listings["name"][i]) for i in similar_indices]
    results[row['id']] = similar_items[1:]
class recommend():
    def item(self,id):
        name = listings.loc[listings['id'] == id]['content'].tolist()[0].split(' // ')[0]
        desc = ' \nDescription: ' + listings.loc[listings['id'] == id]['content'].tolist()[0].split(' // ')[1][
                                    0:165] + '...'
        prediction = name + desc
        return prediction

    def predict(self,item_id,nums):
        #print('Recommending ' + str(num) + ' products similar to ' + self.item(item_id))
        #print('---')
        recs = results[item_id][:nums]

        return recs
recommender=recommend()
#c=recommender.predict(item_id = 4085439)
#print(c)
pickle.dump(recommender, open('model.pkl','wb'))
model = pickle.load( open('model.pkl','rb'))
print(model.predict(item_id = 4085439,nums=6))
