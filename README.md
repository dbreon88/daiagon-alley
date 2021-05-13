Daiagon Alley
Made By Dylan Breon

Getting started:
Prerequisites:
-Latest version of docker installed
-latest version of Node installed

Clone the repo and run:
make run

This will build the project and then run it!

If you need a fresh build after you have done edits you can run

    make clean

And then:

    make run

If you want to just build the project and not run it you can run:

    make build

To stop the docker containers simply press cntrl + c in the terminal that they are running in.

If you would rather run it in the background of your terminal instance you can run it each time with the command

docker compose up -d
