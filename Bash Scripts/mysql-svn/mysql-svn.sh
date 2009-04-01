#!/bin/bash

##
# MySQL DB dump to SVN check-in
# 
# Dumps the specified mysql database to the given location and commits it and
# the previous database to the svn repository.
#
# It is assumed you have already setup the SVN respository to only be the 
# a checkout of the database backup location
#
# Author:       Matt Harris, Easy-Designs LLC
# Copyright:	Copyright (c) 2009 Easy-Designs LLC
# Since:	    Version 0.1
#
# Change Log
# 0.1	| 01.Apr.2009 | Internal Development Version
##

# path to SVN repo folder
SVNREPO=""
# SVN username
SVNUSER=""
# SVN password
SVNPASS=""

# database settings - we use the Plesk admin to dump the SQL so no username
# or password is required
DBNAME=""
DBUSER=""
DBPASS=""

# date is unused at present but is here if you want it
THEDATE=$(date +"%F_%H-%M%P_")

# the name for the sql dump file. You probably don't want to change this
FILENAME=${DBNAME}.sql

# svn up the content
cd $SVNREPO
svn up --username $SVNUSER --password $SVNPASS

# rotate backup sql file
echo "Rotating database backup"
svn delete *.previous

# move the existing file to previous
for a in *.sql; do cp $a ${a}.previous; done
# mark file for deletion in svn
svn delete *.sql

# dump the database using the mysql administrator - so we can see all dbs
echo "Dumping database"
mysqldump -u$DBUSER -p$DBPASS --add-drop-table --extended-insert "${DBNAME}" > "${FILENAME}"

# add everything we have
svn add *
# commit
svn commit --username $SVNUSER --password $SVNPASS -m "SQL Database Dump of ${DBNAME} on ${THEDATE}"