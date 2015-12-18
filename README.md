[![npm version](https://badge.fury.io/js/reall-cli.svg)](https://badge.fury.io/js/reall-cli)

# [Reall Command Line Interface](https://github.com/ReallTeam/reall-cli)

> The official Command-Line for **Reall Project**, a Hadoop Tool for easy Job Automation and Real Time Display base on HDFS and MapReduce.

# How to install

To install just type `npm install reall-cli -g`:

# Create your first Reall Hadoop Job

    # Creating a Reall Hadoop Job:
    #
    $ reall add -j "My First Reall Hadoop" -m "code/mapperByWeekday.py" -r "code/reducerByWeekday.py" -t -c
    $ cd ~/ReallHdop/MyFirstReallHadoop/

    # Download scripts and test datasets
    #
    $ curl -l https://s3-us-west-2.amazonaws.com/reall/data/purchases_100.txt -o input/purchases_100.txt
    $ curl -l https://s3-us-west-2.amazonaws.com/reall/code/mapperByWeekday.py -o code/mapperByWeekday.py
    $ curl -l https://s3-us-west-2.amazonaws.com/reall/code/reducerByWeekday.py -o code/reducerByWeekday.py

    # Run the job
    #
    $ reall hd -j MyFirstReallHadoop

# Using command line help

To see all options type `reall -h`:

    $ reall -h

      Usage: reall [options] [command]


      Commands:

        *
        hd [options]    Run basic Hadoop commands
        fs [options]    Runs basic HDFS commands
        add [options]   Add new Job Definitions to the Reall instance

      Options:

        -h, --help     output usage information
        -V, --version  output the version number

For basic Hadoop commands options type `reall hd -h`:

    $ reall hd -h

      Usage: hd [options]

      Run basic Hadoop commands

      Options:

        -h, --help                       output usage information
        -j, --job [job]                  The job name identifier you want to run
        -m, --mapper [mapper]            The mapper script to be used on hadoop command
        -r, --reducer [reducer]          The reducer script to be used on hadoop command
        -c, --combiner [combiner]        The combiner script to be used on hadoop command
        -i, --input [input]              The input directory for the hadoop command
        -o, --output [output]            The output directory for the hadoop command
        -t, --transporter [transporter]  The transporter script to be used after hadoop command completes successfully

For basic HDFS commands options type `reall fs -h`:

    $ reall fs -h

      Usage: fs [options]

      Runs basic HDFS commands

      Options:

        -h, --help               output usage information
        -p, --put [put]          Puts a file into hadoop file system
        -g, --get [get]          Pulls a file from hadoop file system
        -t, --target [target]    The targeted files to be trasfered
        -d, --destiny [destiny]  The destiny folder where to locate trasfered files


For adding Automated Hadoop Jobs options type `reall add -h`:

    $ reall add -h

      Usage: add [options]

      Add new Job Definitions to the Reall instance

      Options:

        -h, --help                       output usage information
        -j, --job [job]                  The Job Name identifier
        -m, --mapper [mapper]            The mapper script to be used on hadoop job
        -r, --reducer [reducer]          The reducer script to be used on hadoop job
        -c, --combiner [combiner]        The combiner script to be used on hadoop job
        -i, --input [input]              The input directory for the hadoop job
        -o, --output [output]            The output directory for the hadoop job
        -t, --transporter [transporter]  The transporter script to be used after hadoop job completes successfully
