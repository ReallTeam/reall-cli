#!/bin/bash

# HadoopStreamingJar=/opt/./mapr/hadoop/hadoop-2.7.0/share/hadoop/tools/lib/hadoop-streaming-2.7.0-mapr-1506.jar
# HadoopStreamingJar=/opt/./mapr/hadoop/hadoop-2.7.0/share/hadoop/tools/sources/hadoop-streaming-2.7.0-mapr-1506-test-sources.jar
# HadoopStreamingJar=/opt/./mapr/hadoop/hadoop-2.7.0/share/hadoop/tools/sources/hadoop-streaming-2.7.0-mapr-1506-sources.jar
HadoopStreamingJar=/opt/./mapr/hadoop/hadoop-0.20.2/contrib/streaming/hadoop-0.20.2-dev-streaming.jar

#hadoop jar /usr/lib/hadoop-0.20-mapreduce/contrib/streaming/hadoop-streaming-2.0.0-mr1-cdh4.1.1.jar -mapper $1 -reducer $2 -file $1 -file $2 -input $3 -output $4
hadoop jar $HadoopStreamingJar -mapper $1 -reducer $2 -file $1 -file $2 -input $3 -output $4
