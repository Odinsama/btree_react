# BTree in react

This project implements a working BTree data structure and displays it graphically with standard react.

Author: Odin Thorsen

nuid: 001561785

## How to run

1. pull the project to your machine
2. run the command "npm install" in the root of the directory
3. run the command "npm start" in the root of the directory
4. localhost 3000 should open in your default browser and display the contents of this project


## Known limitations, assumptions etc
I made the React graphics by hand in a hurry, so it is ugly and not scalable.
There are no fancy graphics, no time lag that shows what actually happens in the tree, just flickering updates instantly as the state updates.

The tree is always left biased, if the max values is an odd number, when the node is split into two parts it is always split one more to the left.
For example, if max values is 3, and we insert one more to get 4, the first value goes left, the second value goes up and the remaining 2 goes right. 
This is a bias on our part, we could do the opposite and send 2 left, 1 up and 1 right. The key is picking one side to be biased towards and stick with it.




