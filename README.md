# Crypto Calculator

It is a simple web app that calculates
the performance of a cryptocurrency
over a specified time period.

## Features

- Input a cryptocurrency symbol name
- Input a weight in the portfolio
- Select a time interval (1m, 5m, 1h, 1d)
- View a line chart of the asset's performance over time

## Requirements

- Python 3.12+
- Flask
- Requests

## Install

1. Clone the repository:

```
git clone https://github.com/Sabbha20/crypto_cal.git
```

2. Install the required packages:

```
pip install flask requests
```

## Run the Application

1. Start the Flask server:

```
python app.py
```

2. Open a web browser and navigate to -

```
http://127.0.0.1:5001/
```

## How to use:

#### Method 1:

1. Enter a valid cryptocurrency symbol (e.g., BTCUSDT)
2. Enter a weight between 0 and 1
3. Select a time interval
4. Click "Calculate" to view the performance chart

#### Method 2:

1. Enter the url in Postman application:

```
http://127.0.0.1:5001/compute-symbol
```

2. Select '**POST**' Method
3. Select the '*body*' tag
   1. Select `raw` and
   2. Select *JSON* type
4. Enter your input:

```
{
  "symbol": "BTCUSDT",
  "weight": 1,
  "interval": "1d"
}
```

5. Hit **Send**.
6. You will get response:

```
[
    {
        "close_time": 1717631999.999,
        "value": 71108.0
    },
    {
        "close_time": 1717718399.999,
        "value": 70799.06
    },
    {
        "close_time": 1717804799.999,
        "value": 69355.6
    },
    {
        "close_time": 1717891199.999,
        "value": 69310.46
    },
    ...
]
```
