#!flask/bin/python
from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    print 'JSON:', request.json
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True, port=4000, host='192.168.0.151')
