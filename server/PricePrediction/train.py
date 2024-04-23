from joblib import dump
import datetime
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import r2_score
from sklearn.preprocessing import LabelEncoder

dataset = pd.read_csv("server\PricePrediction\dataset (1).csv")
dataset.head(5)

X_train, X_test, y_train, y_test = train_test_split(dataset.iloc[:, :-1], 
                                                    dataset.iloc[:, -1], 
                                                    test_size = 0.3, 
                                                    random_state = 42)

X_train = X_train.iloc[:, 1:]
X_test = X_test.iloc[:, 1:]

X_train.drop(["Name", "Location", "Fuel_Type", "Transmission", "Owner_Type"], axis=1, inplace=True)
X_test.drop(["Name", "Location", "Fuel_Type", "Transmission", "Owner_Type"], axis=1, inplace=True)

curr_time = datetime.datetime.now()
X_train['year'] = X_train['year'].apply(lambda x : curr_time.year - x)
X_test['year'] = X_test['year'].apply(lambda x : curr_time.year - x)

mileage_train = X_train["mileage"].str.split(" ", expand = True)
mileage_test = X_test["mileage"].str.split(" ", expand = True)

X_train["mileage"] = pd.to_numeric(mileage_train[0], errors = 'coerce')
X_test["mileage"] = pd.to_numeric(mileage_test[0], errors = 'coerce')

print(sum(X_train["mileage"].isnull()))
print(sum(X_test["mileage"].isnull()))

X_train["mileage"].fillna(X_train["mileage"].astype("float64").mean(), inplace = True)
X_test["mileage"].fillna(X_train["mileage"].astype("float64").mean(), inplace = True)

cc_train = X_train["engine"].str.split(" ", expand = True)
cc_test = X_test["engine"].str.split(" ", expand = True)
X_train["engine"] = pd.to_numeric(cc_train[0], errors = 'coerce')
X_test["engine"] = pd.to_numeric(cc_test[0], errors = 'coerce')

bhp_train = X_train["power"].str.split(" ", expand = True)
bhp_test = X_test["power"].str.split(" ", expand = True)
X_train["power"] = pd.to_numeric(bhp_train[0], errors = 'coerce')
X_test["power"] = pd.to_numeric(bhp_test[0], errors = 'coerce')

X_train["engine"].fillna(X_train["engine"].astype("float64").mean(), inplace = True)
X_test["engine"].fillna(X_train["engine"].astype("float64").mean(), inplace = True)

X_train["power"].fillna(X_train["power"].astype("float64").mean(), inplace = True)
X_test["power"].fillna(X_train["power"].astype("float64").mean(), inplace = True)

X_train["seats"].fillna(X_train["seats"].astype("float64").mean(), inplace = True)
X_test["seats"].fillna(X_train["seats"].astype("float64").mean(), inplace = True)

X_train["Kilometers_Driven"].fillna(X_train["Kilometers_Driven"].astype("float64").mean(), inplace = True)
X_test["Kilometers_Driven"].fillna(X_train["Kilometers_Driven"].astype("float64").mean(), inplace = True)

X_train.drop(["New_Price"], axis = 1, inplace = True)
X_test.drop(["New_Price"], axis = 1, inplace = True)

standardScaler = StandardScaler()
standardScaler.fit(X_train)
X_train = standardScaler.transform(X_train)
X_test = standardScaler.transform(X_test)

rf = RandomForestRegressor(n_estimators = 100)
rf.fit(X_train, y_train)
y_pred = rf.predict(X_test)
score = r2_score(y_test, y_pred)

dump(rf, 'server/PricePrediction/used_car_price_predictor.joblib')  

print("Model exported successfully!")
print("Accuracy is ",score)



