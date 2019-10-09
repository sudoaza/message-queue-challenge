This is an implementation of a message queue I made for a coding challenge for a job posting.
Hopefully future oferers will check this and other of my repos and not ask for further challenges ;) 

# Problem

Implement a server that speaks a text based TCP protocol. Has a source of events and several clients. 
Receives messages from the source, posibly out of order, and deliveres them to the clients acording to some business logic.
The server must handle an arbitrary large number of messages making it imposible to just store them in memory.

# Server Implementation for Coding Challenge

I've implemented the server using NodeJS because of it's focus in asynchonous
excecution even though it's not my main language.

## Testing

The only dependency is jest for testing. To run the test suite run:

    npm install
    npm test

## Run the Server Only

    docker-compose up server

