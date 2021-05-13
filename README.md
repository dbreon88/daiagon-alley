Daiagon Alley
Made By Dylan Breon

This project is intended to be a dashboard to compare the interest rate for those lending the DAI stable coin
through 3 different providers: - Compound Finance - The Dai Savings Rate (by MakerDAO) - Aaave Protocal
Getting started:
Prerequisites:
-Latest version of docker installed

To run the project you simply need to call the following in terminal within the main directory:

    make run

To stop the docker compose process:

    make stop

If you want a clean build after making edits you can run

    make clean

If you want to just build the project and not run it you can run:

    make build

If you want to run docker in the forefront so you can see the log in terminal you can run:

    make dev
