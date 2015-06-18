********************************
EarthServer SG Mobile (v. 2.6.2) 
********************************

============
About
============

.. image:: images/appicon.png
   :align: left 
   :target: https://github.com/csgf/mi-parallel-portlet
   :alt: mi-parallel-portlet logo
   :scale: 100%
  
This portlet represents a template that allows you to develop your own portlet to submit and run special jobs.

You can choose the kind of parallel job you would like to run from a list containing the following elements:


1. **Job Collection**: is a simple parallel application that spawns N sub-jobs; when all these are successfully  completed the whole collection becomes DONE.

2. **Workflow N1**: is a parallel application that spawns N sub-jobs, waits until all these are correcly completed and then submits a new job whose input files are the outputs of the N sub-jobs. When also this `"final job"` is successfully executed, the whole Workflow N1 becomes DONE.

3. **Job Parametric**: is a parallel application that spawns N sub-jobs with the same executable and with different arguments (i.e., input parametrers); when all these are successfully completed the whole parametric job becomes DONE.

============
Installation
============

This section explains how to deploy mi-parallel-portlet to submit parallel jobs towards a Distributed Computing infrastructure.

1. Move into your Liferay plugin SDK portlets folder and cloneget the mi-paralle-portlet through the following git command:

.. code:: bash

        git clone https://github.com/csgf/mi-parallel-portlet.git

2. Now, move into the just created mi-parallel-potlet directory and execute the deploy command:

.. code:: bash

        ant deploy

When the previous command has completed, verify that the portlet is `"Successfully autodeployed"`, look for a string like this in the Liferay log file under $LIFERAY_HOME/glassfish-3.1.2/domains/domain1/logs/server.log.

3. Then, open your browser at http://localhost:8080 click Add > More in the GILDA menu, click on Add button to add this new portlet. following picture shows the correctly result:

.. image:: images/view.png
    :align: center
    :scale: 80%
    :alt: mi-parallel-portlet view

As soon as the portlet has been successfully deployed you have to configure:

1. the list of e-Infrastructures where the application can be executed;
2. some additional application settings.

Some e-Infrastructure has been already defined as default, in order to simplify the portlet usage. 

1. To configure other e-Infrastructure, from the portlet preferences, you have to be provided the following parameters:
 
 - **Enable infrastructure**: A yes/no flag which enables or disable the generic e-Infrastructure;
 - **Infrastructure name**: A label representig the e-Infrastructure;
 - **Infrastructure acronym**: The acronym to reference the e-Infrastructure;
 - **BDII**: The Top BDII for this e-Infrastructure;
 - **WMS Hosts**: A separated `;` list of WMS endpoint for this e-Infrastructure;
 - **Proxy Robot host server**: The eTokenServer for this e-Infrastructure;
 - **Proxy Robot host port**: The eTokenServer port for this e-Infrastructure;
 - **Proxy Robot secure connection**: A true/false flag if the eTokenServer require a secure connection;
 - **Proxy Robot Identifier**: The MD5SUM of the robot certificate to be used for this e-Infrastructure;
 - **Proxy Robot Virtual Organization**: The VO for this e-Infrastructure;
 - **Proxy Robot VO Role**: The VO role for this e-Infrastructure;
 - **Proxy Robot Renewal Flag**: A true/false Flag to require proxy renewal before it expires;
 - **Local Proxy**: The path to the proxy if you are using a local proxy;
 - **Software Tags**: The list of software tags requested by the application.

The following figure shown how the portlet has been configured to run simulation on the EUMEDGRID-Support e-Infrastructure.
    
.. image:: images/portlet_pref.png
   :align: center
   :scale: 70%
   :alt: mi-parallel-portlet preference

2. To configure the application, the following settings have to be provided:

- **Grid Operation Identification**: The application identifier as registered in the UserTracking MySQL database (GridOperations table), the default value is 10 and in order to see the submitted special jobs status you should insert a new in usertracking database, if it doesn't already exist, using the following command:

.. code:: sql

    INSERT INTO GridOperation VALUES (10, '<portal name>' ,'<applcation description>');

    --portal name: is a lablel representing the portal name;
    --application description: is a lablel representing the application name.

- **Log Level**: The log level for the application (e.g.: *INFO* or *VERBOSE*).


============
Usage
============

The run special jobs you should:

1. select the kind of special job from the combobox;
2. provide the number of task;
3. the input required;
4. a label to identify yours collections;
5. finally, click on the Submit button to execute this collection.

.. image:: images/submit.png
   :align: center
   :scale: 80%
   :alt: mi-parallel-portlet submission example

You can also select the collection type from the combo box, and press the Demo button that submits a demo that consists of 3 tasks. 

Now move to the MyJob portlet and if all went well, this is the result that you should see:

.. image:: images/myjobs.png
   :align: center
   :scale: 80%
   :alt: MyJobs portlet


When all jobs are successfully completed the whole collection becomes **DONE** and you can download the output on you PC, as shown below. 

.. image:: images/output.png
   :align: center
   :scale: 80%
   :alt: Job Collection demo output


============
References
============

============
Support
============
Please feel free to contact us any time if you have any questions or comments.

.. _INFN: http://www.ct.infn.it/
.. _DFA: http://www.dfa.unict.it/

:Authors:
 
 `Mario TORRISI <mailto:mario.torrisi@ct.infn.it>`_ - University of Catania (DFA_),

 `Riccardo BRUNO <mailto:riccardo.bruno@ct.infn.it>`_ - Italian National Institute of Nuclear Physics (INFN_)

:Version: v1.0, 2015

:Date: June 16th, 2015 18:00
