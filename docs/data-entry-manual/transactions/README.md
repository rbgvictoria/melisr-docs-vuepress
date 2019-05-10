# Transactions

Information about herbarium transactions is recorded in the **Interactions** module in Specify. Two separate collections are used to record details of MEL transactions: outgoing loans, donations and exchange are recorded in the *National Herbarium of Victoria* collection, and incoming loans are recorded in the *Non-MEL loans* collection.

## Loans

In MELISR, loans of MEL specimens to other institutions are recorded in the **Loan** table. The Loan table has two views: **Loan** and **Loan w/o preps**. The **Loan w/o preps** table allows you to enter data about the loan before specifying which specimens will be part of the loan. See the **Databasing loans** (p. 120) section for more information on how to use the two loan views.

### Loan form

#### Loan

##### Loan number

The MEL loan number comprises two parts, separated by a forward slash:

-   Year – the year the loan was prepared
-   Number – a sequential, four-digit number. The sequence restarts at 0001 each year.

Old loan numbers have been converted to this format based on the year they were sent out (e.g. MEL loan 210 = 1974/0210).

This field fills automatically when the loan record is saved; however, the loan number needs to be entered manually for the first loan in each calendar year and for transferred loans.

Note that the abbreviation for the recipient institution (e.g. CANB) appears after the loan number but is not part of the loan number. The abbreviation is taken from the institution in the **Sent to** field when the record is saved.

##### Loan status

The current status of the loan. The following values can be selected from the pick list:

-   Awaiting acknowledgement – loan has been sent, but the yellow acknowledgement form has not been received at MEL
-   Complete – all loan preparations have been returned to MEL (or transferred to another institution)
-   Current – all or some preparations are still on loan
-   New – the loan is being prepared
-   Not serviced – the loan request was received but not serviced
-   Written off – the loan has been closed because the specimens have been lost or destroyed.

##### Quantity on loan

The number of preparations that are on loan. This field fills automatically when loan preparations are added or returned.

##### Date requested

The date the recipient institution requested the loan (i.e. date of formal loan request).

##### Current due date

The date by which the loan is due to be returned to MEL. For loans where an extension has been granted, the **Current due date** should be updated.

##### Extension granted

A check box indicating if an extension has been granted. The new due date should be recorded in **Current due date**. Details of who granted the extension and the date are recorded in the **Description** field, and should be prefixed by a double pipe (||).

##### Original due date

The date by which the loan was originally due to be returned to MEL. For loans where no extension has been granted, the **Original due date** will be the same as the **Current due date**.

##### Description

A short summary of the contents of loan. For example:

-   *‘Utricularia* specimens set aside during visit to MEL on 13 Sep 2010’
-   ‘Selected Victorian specimens of *Epacris impressa’*.

This description appears on the loan paperwork. Subsequent comments should be prefixed by a double pipe ( ‘||’), for example:

-   ‘Selected Victorian specimens of *Epacris impressa.* || Extension granted by J.Smith, 4/4/2011.’

##### Project

This field is used to indicate if a loan was requested for a particular project. ‘Flora of Australia Project’ is currently the only project in the pick list.

##### Destructive sampling permitted

A check box to indicate if destructive sampling has been approved (either at the time the loan was prepared, or subsequently). Details of destructive sampling permission should be included in **Conditions**.

##### Conditions

Any conditions other than the standard MEL loan conditions, such as details of permission for destructive sampling to be undertaken.

##### Acknowledged

The date of receipt of the loan at the receiving institution (as recorded on the yellow acknowledgement slip).

##### Received comments

Comments noted by the receiving institution on the yellow acknowledgement slip (e.g. damage to specimen(s), discrepancies between specimens sent and loan list).

##### Loan notice

Details of the most recent notice sent to the receiving institution regarding the loan. Details of previous notices are recorded in the **Description** field, prefixed by a double pipe (‘||’). The following values can be selected from the pick list:

-   Acknowledgement request
-   Extension
-   Overdue
-   Recall
-   Reminder.

##### Notice sent

The date on which the most recent notice was sent to the receiving institution.

##### Loan closed

The date on which all loaned specimens are processed as returned. For full loan transfers, this is the date on which the loan is acknowledged as received by the institution to which it was transferred.

##### Loan transfer no. 

For transferred loans (full or partial), the loan number to which the loan has been transferred. For loan transfers, the year and number components stay the same, but the institution code changes to that of the institution to which the loan has been transferred. For example, if loan 1974/0210 CANB is transferred to AD, the transferred loan number is 1974/0210 AD.

#### Loan agents

##### Name

The botanist(s) and/or student(s) on behalf of whom the loan was requested. A loan may have multiple loan agents (e.g. student and supervisor(s)).

##### Role

The role of the agent in the loan. The following values can be selected from the pick list:

-   Botanist
-   Other
-   Student
-   Supervisor.

#### Shipments

##### Sent to

The institution to which the loan was sent. This corresponds to **Last name** in the **Agent** table and is formatted as the herbarium code followed by ‘ -- ‘ then the title of the institution (e.g. CANB -- Australian National Herbarium). If the institution is in the **Agent** table, but is not formatted as above, please edit the **Agent** record first.

##### Shipment number

An auto-generated identifier for the shipment.

##### Date sent

The date the loan was prepared for dispatch. This date prints on the loan paperwork.

##### Prepared by

The Curation Officer(s) who prepared the loan. This prints on the loan paperwork. If the consignment was prepared by more than one Curation Officer, they should be entered as a ‘Group’ agent (see ‘**Group’ agents**, p. 92).

##### Method

The method by which the loan was shipped. The pick list values relevant to loans are:

-   Air Mail – Customs Insured (loans to overseas institutions)
-   Collected from MEL
-   Courier
-   Express Post
-   Hand delivered
-   Registered Post (loans to Australian institutions)
-   Sea Mail – Customs Insured (very large or heavy loans to overseas institutions)
-   Transfer.

##### Reference no(s) 

Tracking numbers for each parcel in the shipment (from the Registered Post or Customs Insured label).

##### Number of parcels

The number of parcels in the shipment.

##### Weight

The total weight of the parcels in the shipment, in kilograms (e.g. 450 g = 0.45).

##### Postage

The total postage cost for the consignment, as calculated using the [Australia Post postage calculator](http://auspost.com.au/apps/postage-calculator.html).

##### Comments

Any comments relevant to the shipment, for example:

-   ‘sent with exchange MEL ref. 1987’.

#### Loan preparations

The **Loan** preparations subform is used to record the details of the preparations in the loan. Only loans sent after 1 January 1996 are linked to loan preparations. Specimens sent on loan prior to 1996 were not databased.

##### Catalogue no.

The catalogue number of the specimen.

##### Preparation type

The preparation type of the specimen that is being sent on loan. Preparations that can be sent on loan are:

-   Sheet
-   Packet
-   Spirit collection
-   Microscope slide
-   Fungal culture
-   Carpological
-   Display set.

##### Is resolved

This field indicates whether the loan of an individual preparation has been resolved. ‘Yes’ indicates that the preparation has been returned to MEL (or otherwise accounted for). ‘No’ indicates that the preparation is on loan.

##### Quantity

The number of preparations relating to a single collection object that have been sent on loan. For example, if there are three microscope slides for a given specimen, and all are sent on loan, the quantity will be ‘3’.

##### Outgoing comments

Comments specific to the preparation at the time the loan is sent (e.g. permission for destructive sampling; specimen not scanned when loan sent).

##### Borrower’s comments

Specific comments noted by the receiving institution (e.g. that the specimen was damaged on receipt of the loan).

##### Incoming comments

Comments specific to the preparation when it is returned to MEL (e.g. damage to specimen; notes about updates required when the specimen is returned).

##### Status

The status of a preparation that is resolved, but not returned. The following values are available in the pick list:

-   Destroyed
-   Lost
-   Transferred
-   Written off.

##### Loan return preparations

The preparation type and quantity returned.

### Loan return preparations

The **Loan return preparations** table is used to record details relating to the return of individual specimens from loan.

##### Processed by (agent) 

The Curation Officer who processed the loan return.

##### Date returned

The date on which the preparation is processed as returned.

##### Quantity returned

The number of preparations returned from loan. When all components of a given preparation are returned, the quantity returned will equal the quantity sent. In cases where preparations are lost, destroyed or written off, the quantity returned will not be equal to the quantity sent.

##### Quantity resolved

The number of preparations resolved. When all components of a given preparation are returned, the quantity resolved will equal both the quantity returned and quantity sent. In cases where preparations are lost, destroyed or written off, the quantity resolved will not be equal to the quantity returned.

*Note:* all preparations for a given loan must be resolved before a loan can be closed.

#### Loan return

##### Returned comments

A summary of the material returned, including the number of specimens, date returned and comments. For example:

-   ‘5 returned, 3/3/2010. Quarantined material VM10002535.’.

This information must be entered for all pre-1996 loans. It is not required for post-1996 loans; details of previous partial returns can be deleted if all information correlates with the loan information summary in the loan returner.

##### Quarantine

A check box to indicate if the loan was quarantined when it was returned to MEL. The Quarantine Entry Number is entered in **Returned comments**.

#### Administrative fields

The following fields are automatically completed and cannot be edited.

##### Created by

The person who created the database record.

##### Created

The date the record was created.

##### Last edited by

The person who last edited the record.

##### Last edited

The date the record was last edited.

### Databasing loans

#### Entering a new MEL loan

New loans are entered by the Team Leader Collections Curation once approved by the Manager Collections and Executive Director Science.

To enter a new **Loan** record:

1.  Open the **Interactions** module

2.  Click **Loan w/o preps** in the side bar

3.  Enter details in the following fields:

    -   **Loan status** – i.e. ‘New’
    
    -   **Date requested**
    
    -   **Description**
    
    -   **Destructive sampling permitted**
    
    -   **Conditions** – e.g. details of destructive sampling permitted; quarantine message for all loans to overseas institutions
    
    -   **Loan agent(s)** **Name** and **Role** – check that a first name is recorded for each agent involved in a loan
    
    -   **Sent to** – check and/or add or all agent details, including Index Herbariorum code, title, address and CITES or Department of the Environment registration code
    
    -   **Prepared by**.

4.  Save the loan record. The **Loan number** will be automatically completed when the record is saved.

#### Adding preparations to a loan 

Preparations are added to a loan by a Curation Officer. Note that it’s not possible to add a preparation to a loan while databasing a specimen.

To add preparations to an existing **Loan** record:

1.  Create a record set using one of the following methods:

    -   Open the **Record set creator** and scan barcodes into the **MEL barcodes** text box. Select **Create record set** and name the record set with the loan number (e.g. 2011/0011 NSW). Note that you’ll need to exit and log back into MELISR to access the record set.
    
    -   Open the **Record set creator** and scan barcodes into the **MEL barcodes** text box. Select **Create barcode string**. Copy and paste the barcode string into the **Barcode** field in the **Collection object** table in the **Query builder**. Select ‘In’ as the **Operator** and run the query. Save the results as a record set by clicking on the **Record set** symbol in the results bar. Name the record set with the loan number – note that ‘/’ must be replaced with ‘-‘ (e.g. 2011-0011 NSW), because record set names can’t include a forward slash.
    
    -   Scan barcodes directly into the **Barcode** field in the **Collection object** table in the **Query builder**. Use a comma after each barcode. Select ‘In’ as the **Operator** and run the query. Save the results as a record set by clicking on the **Record set** symbol in the results bar. Name the record set with the loan number – note that ‘/’ must be replaced with ‘-‘ (e.g. 2011-0011 NSW), because record set names can’t include a forward slash.
    
    -   For spirit or microscope slide preparations, create a record set by querying on the spirit/slide number in the **Preparation** table.
    
    {: .alert .alert-info }

    *Note:* more than one record set can be added to a loan record.

2.  In MELISR, find the loan by searching for the loan number in either the **Simple search** (e.g. ‘2011/0001\*’) or the **Loan number** field (in the **Loan** table) in the **Query builder**

3.  Open the **Loan** form and click **Edit**

4.  Click the **Add** symbol in the **Loan preparations** form

5.  Select **Record sets and information requests** when prompted to choose the source of the preparations

6.  Select the relevant record set from the list and click **OK**

7.  In the **Create loan from preparations** window, click **Select all**, scan through the list and deselect any preparations that are not part of the loan (e.g. microscope slides). Note that duplicate preparations don’t need to be deselected at this point (see step 10).

8.  Click **OK**

9.  Save the **Loan** record

10.  Open the [Herbarium transaction paperwork](http://melisr.rbg.vic.gov.au/transactions) and, in the **Loans** section, select the loan from the drop-down list and click **Delete ‘duplicate’ loan preparations**.

#### Deleting preparations from a loan 

The Team Leader Collections Curation and Curation Officers can delete preparations from a loan. A loan preparation should only be deleted if it was erroneously added (e.g. if the wrong MEL number was entered), and only before the loan is dispatched. See the Team Leader Collections Curation if a preparation needs to deleted after the loan has been sent.

#### Adding shipment details to a loan

Shipment details are added to a loan by a Curation Officer once the specimens have been checked, scanned and packed.

1.  Add details to the following fields:
    -   **Date sent**
    -   **Method** – the postal category used to send the shipment
    -   **Reference no(s)** – the tracking reference number(s) for parcels (e.g. Registered Post, Customs Insured). Scan labels directly into this field, using a comma to separate entries. Ensure that the shipment method matches the label type.
    -   **Number of parcels**
    -   **Weight** – total weight of all parcels in the consignment
    -   **Postage** – total cost of postage (calculate the postage using the online [Australia Post calculator](https://auspost.com.au/parcels-mail/calculate-postage-delivery-times/#/))
    -   **Comments** – e.g. notable damage to a specimen.
2.  Change the **Loan status** from ‘New’ to ‘Awaiting acknowledgement’
3.  Save the **Loan** record.

#### Printing loan paperwork

1.  Go to the [Herbarium transaction paperwork](http://melisr.rbg.vic.gov.au/transactions) page
2.  Select the relevant loan from the list. The list is sorted in descending order by loan number; greyed-out numbers are loans without preparations.
3.  Print paperwork as follows:
    | White copy | Yellow copy | Pink copy |
    |-|-|-|
    | loan paperwork | loan paperwork | loan paperwork |
    | list of preparations |          |                |
    | loan conditions |               |                |
4.  Print the required number of **Parcel labels** and an **Envelope**.

#### Returning a databased MEL loan 

1.  Open the [Loan returner](http://melisr.rbg.vic.gov.au/loanreturn)
2.  Select the relevant loan from the drop-down list
3.  Scan the returned specimens into the loan returner one by one (or scan into a Word or Excel document and copy and paste list of MEL numbers with each on a separate line)
4.  Select **Update batch**
5.  If necessary, adjust the **Quantity returned** (e.g. if multiple spirit or microscope slide preparations were sent, but not all have been returned)
6.  Select the **Curation Officer**
7.  Enter the **Date returned**
8.  If necessary, enter the quarantine reference number in **Quarantine message**
9.  Click **Return batch**
10. Open the relevant loan in MELISR and check that the **Loan preparation** table, **Quantity on loan**, **Loan status** and **Loan closed** are correct
11. Update **Returned comments** if details of previous returns have been entered
12. **Save** the loan form.

#### Returning an undatabased MEL loan (pre-1996 loans) 

1.  Open the **Loan form** for the relevant loan and select **Edit**
2.  Enter the number of specimens returned and the date in **Returned comments**, along with any relevant comments (quarantine reference number, discrepancies in number of specimens, etc). For example:
    +   ‘5 returned, 3/3/2010.’
    <br>Use a full stop between each entry.
3.  Update the **Quantity on loan** (in the top right-hand corner of the form). The quantity needs to be calculated manually.
4.  For complete returns:
    -   change the **Loan status** to ‘Complete’
    -   enter the date in **Loan closed**
    -   flag the **Closed** check-box (in the bottom right-hand corner of the form)
5.  **Save** the loan form.

#### Transferring a databased MEL loan

Loan transfers are entered by the Team Leader Collections Curation. Loan transfers must be formally requested by the institution to which they are to be transferred.

1.  Create a record set and barcode string for the loan preparations to be transferred
2.  Open the **Loan returner** (<http://melisr.rbg.vic.gov.au/loanreturn>)
3.  Select the relevant loan from the list and enter the barcode string
4.  Select the **Curation Officer**
5.  Enter the **Date returned**
6.  Select the **Transferred** checkbox
7.  Click **Return batch**
8.  In MELISR, open the **Loan form** for the relevant loan and select **Edit**
9.  Enter the **Transfer loan no** (the existing MEL loan number, but with the institution code for the institution to which the loan is being transferred)
10. Check that the relevant loan preparations are flagged as returned, resolved and transferred in the **Loan preparations** table
11. Check that the **Loan status** and **Quantity on loan** are correct
12. **Save** the loan record
13. Create a new **Loan record**, add the relevant record set and add loan details:
    -   **Loan status** – i.e. ‘Awaiting acknowledgement’
    -   **Date requested**
    -   **Description**
    -   **Destructive sampling permitted**
    -   **Conditions** – e.g. if destructive sampling permitted
    -   **Loan agent(s)** and **Role(s)**
    -   **Institution** – enter or check all details, including title, Index Herbariorum code, address and CITES or    Department of the Environment registration code
    -   **Date sent** – i.e. date of transfer
    -   **Prepared by**
    -   **Method** – i.e. ‘Transfer’
    -   **Comments** – i.e. ‘\[Quantity\] transferred from \[original institution\].’
14. **Save** the loan record.

#### Transferring an undatabased MEL loan (pre-1996 loans) 

Loan transfers are entered by the Team Leader Collections Curation. Loan transfers must be formally requested by the institution to which they are to be transferred.

1.  Open the loan form for the loan to be transferred and select **Edit**
2.  Update the **Loan status** (if necessary) and **Quantity on loan**
3.  Enter the **Transfer loan no** (the existing MEL loan number, but with the institution code for the institution to which the loan is being transferred)
4.  Update **Returned comments**: ‘\[Quantity\] transferred, \[date\].’
5.  Enter **Loan closed** (the date on which the loan is acknowledged as received by the institution to which it was transferred)
6.  **Save** the loan record
7.  Create a new **Loan record** and add loan details:
    -   **Loan status** – i.e. ‘Awaiting acknowledgement’
    -   **Date requested**
    -   **Description**
    -   **Destructive sampling permitted**
    -   **Conditions** – e.g. if destructive sampling permitted
    -   **Loan agent(s)** and **Role(s)**
    -   **Institution** – enter or check all details, including title, Index Herbariorum code, address and CITES or Department of the Environment registration code
    -   **Date sent** – i.e. date of transfer
    -   **Prepared by**
    -   **Method** – i.e. ‘Transfer’
    -   **Comments** – i.e. ‘\[Quantity\] transferred from \[original institution\].’
8.  **Save** the loan record.

## Outgoing exchange and donations

Outgoing consignments of exchange, donations and shipping material are recorded in the **Gift** table.

### Gift form

#### Gift

##### Gift number

The MEL reference number for a consignment of outgoing exchange, donation or shipping material. The gift number is generated automatically when a record is saved. The same sequence is used for both incoming and outgoing consignments (i.e. gift numbers and exchange numbers are allocated sequentially).

##### Category

The category of material being sent. The following options are in the pick list:

-   Donation – duplicate specimens sent to an institution with which MEL does not have a formal exchange agreement
-   Exchange – duplicate specimens sent to an institution with which MEL has a formal exchange agreement
-   Shipping material – material other than duplicate specimens (e.g. samples for destructive analysis).

##### Quantity

The number of specimens (or samples) in the consignment. This field fills automatically once preparations are added.

##### File name

The file name for electronic data for the consignment.

##### Description

A summary of the contents of the consignment. For example:

-   ‘Miscellaneous vascular plants and cryptogams (incl. two types)’.

This description appears on the MEL paperwork. Subsequent comments should be prefixed by a double pipe (‘||’). For example:

-   ‘Miscellaneous vascular plants and cryptogams (incl. two types). || Request for acknowledgement of receipt sent 18 May 2011.’

##### Acknowledged

The date on which the recipient institution processed the consignment (as recorded on the yellow acknowledgement form).

##### Received comments

Any comments noted by the recipient institution on the yellow acknowledgement form (e.g. damage to specimen(s); discrepancies between specimens sent and specimen list).

#### Gift agents

##### Name

Usually the person to whom the electronic data was sent (for exchange or donations), or the botanist(s) and/or student(s) who requested the material (e.g. for shipping material). A consignment can have more than one agent.

##### Role

The role of the agent in the exchange, donation or shipping material transaction. The following values can be selected from the pick list:

-   Botanist
-   Other
-   Recipient of exchange file
-   Student
-   Supervisor.

#### Shipments

##### Sent to

The institution to which the consignment was sent. This corresponds to **Last name** in the **Agent** table and is formatted as the herbarium code followed by ‘ -- ‘ then the title of the institution (e.g. CANB -- Australian National Herbarium). If the institution is in the **Agent** table, but is not formatted as above, please edit the **Agent** record first.

##### Shipment number

The auto-generated identifier for the shipment.

##### Date sent

The date on which the consignment was dispatched. This date appears on the MEL paperwork.

##### Prepared by

The Curation Officer(s) who prepared the consignment. If the consignment was prepared by more than one Curation Officer, they should be entered as a ‘Group’ agent (see ‘**Group’ agents**, p. 92).

##### Method

The method by which the shipment was sent. The following options are available in the pick list:

-   Air Mail – Customs insured (no longer used)
-   Air Mail – Customs non-insured
-   Collected from MEL
-   Courier
-   Express Post
-   Express Post International
-   Hand delivered
-   Pack & Track International
-   Registered Post (within Australia only)
-   Sea Mail – Customs insured (no longer used)
-   Sea Mail – Customs non-insured (very large or heavy consignments).

##### Reference no(s) 

The tracking number for each parcel in the shipment. Tracking numbers should be scanned from the consignment note or label (e.g. Registered Post label, Pack & Track International consignment note), rather than entered manually. Multiple numbers should be separated by commas.

##### Number of parcels

The number of parcels in the shipment.

##### Weight

The total weight of the parcels in the shipment, in kilograms (e.g. 450 g = 0.45).

##### Postage

The total postage cost for the consignment, as calculated using the [Australia Post postage calculator](http://auspost.com.au/apps/postage-calculator.html).

##### Comments

Any comments relevant to the shipment, for example:

-   ‘Sent with MEL loan 2011/0006’.

#### Gift preparations

##### Catalogue no. 

The catalogue number of the gift preparation.

##### Quantity

The number of duplicate preparations for a given catalogue number that are included in the consignment. For exchange, donations and shipping material, the quantity will usually be ‘1’.

##### Preparation type

The following preparation types can be sent as exchange/donation/shipping material:

-   Duplicate
-   Seed duplicate
-   Silica gel sample
-   Shipping material.

##### Quantity

The total number of duplicate preparations for a given catalogue number (e.g. if a specimen has duplicates assigned to BRI, CANB and NSW, the quantity is ‘3’).

##### Description

A description specific to the individual duplicate or shipping material preparation (e.g. for shipping material, the description might denote the type of material (leaf material, anthers, etc.)).

##### Migration comments

This field is used to record any problems noted when data was imported into Specify from the Loans and Exchange database in April 2011. These comments generally relate to a discrepancy between the number of specimens noted in the Loans and Exchange database, and the number of records in the electronic file for the consignment.

#### Administrative fields

The following fields are automatically completed and cannot be edited.

##### Created by

The person who created the database record.

##### Created

The date the record was created.

##### Last edited by

The person who last edited the record.

##### Last edited

The date the record was last edited.

### Databasing outgoing donations and exchange

#### How to process outgoing exchange, donation or shipping material

1.  Create a record set for the preparations in the consignment using one of the following methods:

    For large consignments (more than ten specimens):

    -   Open the **Record set creator** (http://melisr.rbg.vic.gov.au/recordset) and scan barcodes into the **MEL barcodes** text box and select **Create record set**. You’ll need to exit and log back into MELISR to access the record set.
    
        OR
    
    -   Open the **Record set creator** and scan barcodes into the **MEL barcodes** text box. Select **Create barcode string**. Copy and paste the barcode string into the **Barcode** field (in the **Collection object** table) in the **Query builder**. Select ‘In’ as the **Operator** and run the query. Save the results as a record set by clicking on the **Record set** symbol in the results bar.
    

    For small consignments (fewer than ten specimens):
    
    -   Open the **Query** **builder** and select the **Barcode** field from the **Collection object** table. Select ‘In’ as the **Operator** and scan the barcodes into the search box (use a comma between each barcode). Run the query and save the results as a record set by clicking on the **Record set** symbol in the results bar.
    
    {: .alert .alert-info }
    *Note:* multiple record sets can be added to a gift record.

2.  In MELISR, click **Interactions** in the task bar

3.  Click **Gift** in the side bar

4.  Select **Record sets** when prompted to choose source of preparations

5.  Select the relevant record set

6.  Select the **Preparation type** and **Quantity** for each preparation by either:

    -   Manually flagging each preparation
    
        OR
    
    -   **Select all**, then **Save** the Gift record. Open the herbarium transactions page (http://melisr.rbg.vic.gov.au/transactions), select the relevant exchange consignment from the list and click on **Clever button thing**. This will remove any silica gel sample preparations as well as non-giftable preparations (sheet, packet, spirit, etc.). You will still have to check the **Gift** record and manually remove any other preparations that are not included in the consignment (e.g. Seed duplicates).
    
    {: .alert .alert-warning }
    *Note:* only ‘Duplicate’, ‘Seed duplicate’, ‘Silica gel sample’ and ‘Shipping material’ preparations should be added to Gift records.

7.  Enter details in the following fields:

    -   **Category**
    -   **Description**
    -   **Gift agent(s) Name(s)** and **Role(s)**
    -   **Sent to**
    -   **Date sent**
    -   **Prepared by**
    -   **Method**
    -   **Reference no(s)**
    -   **Number of parcels**
    -   **Weight**
    -   **Postage**
    -   **Comments** – e.g. notable damage to a specimen

8.  **Save** the form. Select **Exit** when prompted to print a Gift invoice

9.  Open the **Exchange metadata** page (http://melisr.rbg.vic.gov.au/exchangedata) and select the relevant exchange consignment from the **Exchange** drop-down list

10.  If the consignment contains records that have been created or edited on the day they’re being sent, click on the **Update BioCASe** button

11.  Select the **Output format** (refer to the agent record to check which file type to send) and press **Submit**

12.  Name the file using the gift number (e.g. MEL exchange 1602 PAL) and save it to the relevant folder in `S:\\COLLECT\\Loans & exchange\\Exchange\\Outgoing exchange`

13.  Add the **File name** to the **Gift** record in MELISR

14.  Open the herbarium transactions page (http://melisr.rbg.vic.gov.au/transactions) and select the relevant exchange consignment from the drop-down list

15.  Select ‘Exchange paperwork’ and print three copies – one each on white, yellow and pink paper. The white and yellow copies are sent with the consignment (box 1) and the pink copy is attached to the paperwork kept at MEL.

16.  Save a copy of the exchange paperwork as a PDF file to e-mail to the receiving institution

17.  Select ‘List of preparations’ and print two copies (one to send with the consignment and one to retain at MEL). Printed double-sided if necessary.

18.  Select ‘Parcel labels’ and print the required number

19.  Using the HerbMEL account, e-mail the exchange paperwork and data to the receiving institution (refer to the agent record for contact details). Record the file name in the subject line (e.g. MEL exchange 1602).

#### How to enter outgoing shipping material using a dummy record

MEL occasionally ships specimens, samples or other materials that are not linked to MEL specimens (e.g. recently collected non-MEL specimens, unvouchered pollen samples). In such cases, a dummy record needs to be used in order to create a **Gift** record:

1.  Open the dummy record MEL 999999A in MELISR and edit the preparation type and quantity in accordance with the type and quantity of material to be sent
2.  Open the **Interactions** module and click **Gift** in the side bar
3.  Select **Enter Catalogue Numbers** when prompted to choose source of preparations
4.  Enter 9999999A
5.  Select the **Preparation type** and **Quantity** and follow steps 7 and 14–19 as above
6.  Return to the **Gift** record, delete the dummy preparation and save the record.

#### Deleting preparations from a gift record

The Team Leader Collections Curation and Curation Officers can delete preparations from a gift. A preparation should only be deleted from a gift before the consignment is dispatched (except in the case of shipping material consignments created using a dummy record). See the Team Leader Collections Curation if a preparation needs to deleted after a consignment has been sent.

#### Sending silica gel samples as shipping material

Where material from a silica gel sample is sent to a researcher to be used for destructive sampling, the silica gel sample preparation should be added to the relevant **Gift** record (i.e. there is no need to create a separate shipping material preparation). When adding ‘Silica gel sample’ preparations to a **Gift** record, each preparation needs to be flagged manually. Do not ‘Select all’ and use the ‘Clever button thing’, as this will delete the silica gel sample preparations from the record.

If the entire silica gel sample is used, the quantity in the ‘Silica gel sample’ preparation should be changed to ‘0’ after the material is sent. If only part of the silica gel sample is used, the quantity will need to be adjusted retrospectively to reflect the number of consignments of shipping material that the silica gel sample preparation is linked to (e.g. if material from a single silica gel sample preparation is sent to two separate researchers, and there is still material at MEL, the quantity in the ‘Silica gel sample’ should be ‘3’).

Remember to follow the destructive sampling procedure when processing material, including filling in the **Destructive sampling** fields in the **Conservator event** table.

## Incoming exchange

Incoming consignments of exchange, donations and shipping material are recorded in the **Exchange in** table.

### Exchange in form

#### Exchange in

##### Exchange number

The MEL reference number for a given consignment of incoming exchange, donation or shipping material. The exchange number is generated automatically when a record is saved. The same sequence is used for both incoming and outgoing consignments (i.e. gift numbers and exchange numbers are allocated sequentially).

##### Date received

The date on which the consignment was checked and processed at MEL.

##### Category

The category of material received. The following options are in the pick list:

-   Donation – specimens received from an institution (or individual) with which MEL does not have a formal exchange agreement
-   Exchange – duplicate specimens received from an institution with which MEL has a formal exchange agreement
-   Shipping material – material that will not be accessioned at MEL (e.g. material for destructive sampling).

##### Processed by

The Curation Officer(s) who processed the consignment. If the consignment was prepared by more than one Curation Officer, they should be entered as a ‘Group agent’. *Note:* consignments received prior to May 2011 are all flagged as being processed by Alison Vaughan as this field was not recorded in the previous Loans and Exchange database.

##### Received from

The institution from which the consignment was received. This corresponds to **Last name** in the **Agent** table and is formatted as the herbarium code followed by ‘ -- ‘ then the title of the institution (e.g. CANB -- Australian National Herbarium). If the institution is in the **Agent** table, but is not formatted as above, please edit the **Agent** record first.

##### Date sent

The date on which the consignment was sent to MEL (as noted on the paperwork received with the material).

##### Quantity

The number of specimens (or samples) in the consignment.

##### Description

A short summary of the contents of the consignment. For example:

-   ‘Miscellaneous vascular plants and cryptogams’.

##### File name

The file name for electronic data for the specimens in the consignment.

#### Administrative fields

The following fields are automatically completed and cannot be edited.

##### Created by

The person who created the database record.

##### Created

The date the record was created.

##### Last edited by

The person who last edited the record.

##### Last edited

The date the record was last edited.

### Databasing incoming exchange, donation or shipping material

1.  Open MELISR and click **Interactions** in the task bar

2.  Click on **Exchange In** in the side bar

3.  Enter details in the following fields:

    -   **Exchange number**
    -   **Date received**
    -   **Category**
    -   **Processed by**
    -   **Received from**
    -   **File name**
    -   **Date sent**
    -   **Quantity**
    -   **Description**

3.  Save the form

4.  Record the exchange number (MEL ref. no.) in red pen on the top right-hand corner of the paperwork.

## Non-MEL loans

The *Non-MEL loans* collection is in a separate collection in MELISR. To access it, log into MELISR and select *Non-MEL loans* in the **Choose a Collection** window.

### Non-MEL loan form

#### Loan

##### MEL reference number

A four-digit reference number allocated when a loan is received at MEL. This field fills automatically when a new loan record is created.

##### Loan status

The current status of the loan. The following values are available in the pick list:

-   Requested – formal loan request sent but specimens not yet received at MEL
-   Current – all specimens still at MEL (or some returned and confirmed as received)
-   Returning – all or some specimens returned but not confirmed as received
-   Complete – all specimens returned and confirmed as received
-   Written off – all specimens lost or destroyed.

##### Quantity outstanding

The number of specimens currently on loan (i.e. the quantity borrowed minus the quantity returned). For loans with loan preparations, **Quantity outstanding** is calculated automatically when a new **Shipment** record is added (i.e. when a return or transfer is processed).

##### Loan number

The loan number allocated by the lending institution. The loan number is automatically prefixed with the abbreviation of the lending institution when the record is saved (e.g. BM 2626M).

##### Quantity borrowed

The number of specimens received in the loan.

##### Received

The date on which the loan was checked and acknowledged at MEL.

##### Current due date

The date by which the loan is to be returned. The loan period is generally 12 months from the date of receipt, unless specified otherwise. The **Current due date** will be the same as the **Original due date** unless the loan has been extended.

##### Original due date

The date by which the loan is to be returned. The loan period is generally 12 months from the date of receipt, unless specified otherwise.

##### Loan closed

A check box used to indicate that all specimens have been returned (or transferred) and acknowledged.

##### Taxa

The families and genera or taxa in the loan. Taxa should be entered in the following formats:

For loans containing multiple taxa:

-   MOSS: Aloina, Crossidium, Desmatodon, Tortula
-   ASTERACEAE: Abrotanella, Arrhenechthites, Bedfordia, Brachyglottis, Crassocephalum, Delairea, Emilia, Erechtites, Euryops, Gynura, Othonna, Roldana, Vernonia

For loans containing a single taxon:

-   MYRTACEAE: Eucalyptus globulus
-   MYRTACEAE: Isotype of Eucalyptus globulus.

##### Conditions

Any special conditions specified by the lending institution. For example:

-   ‘Six month loan period’
-   ‘Destructive sampling permitted subject to K destructive sampling policy’.

##### Comments

Any comments pertinent to the loan. For example:

-   ‘Released from quarantine NM12000784’
-   ‘44 received 02/07/2001. 3 received 12/02/2003.’
-   ‘1 packet and 32 spirit’
-   ‘41 packets and 108 sheets (306 specimens)’.

##### Loan transfer

Details of loan transfers, both to and from MEL. For example:

-   ‘Transferred from CANB’
-   ‘Transferred to AD’.

##### Extension

A summary of loan extensions requested and granted. For example:

-   ‘12 month extension granted 13/10/2005. 12 month extension requested 02/11/2007.’

##### Extension requested

The date of the most recent request to extend the loan.

##### Loan extended

A check box used to indicate that the most recent request for extension has been granted.

##### Old MEL ref. 

The MEL ref. no. for loans that pre-date the current MEL ref. sequence. For example:

-   ‘Page 15’.

#### Loan agents

##### Agent 

The institution from which the loan originated (lending institution) and the MEL botanist(s) and student(s) on behalf of whom the loan was requested.

##### Role

The role of the agent in the loan. The following values can be selected from the pick list:

-   Botanist
-   Lending institution
-   Student.

*Note:* The loan agents should ideally appear in the following order: Lending institution, Botanist, Student. The loan agents currently appear in random order, and the order changes every time the record is saved.

#### Shipments

The **Shipment** table provides a record of all returns and/or transfers for a given loan.

*Note:* Loans that have been returned or transferred in parts have multiple shipment records. It’s easiest to view these in grid form. Multiple shipment records should ideally appear in reverse chronological order, but they currently appear in random order.

##### Shipped to

The institution to which the loan was returned or transferred.

##### Shipment no. 

An auto-generated identifier for the shipment.

##### Date sent

The date on which the consignment was processed at MEL.

##### Prepared by

The Curation Officer(s) who processed the return of the loan.

##### Method

The method by which the loan was shipped. The pick list values relevant to loans are:

-   Air Mail – Customs Insured (loans to overseas institutions)
-   Collected from MEL
-   Courier
-   Express Post
-   Hand delivered
-   Registered Post (loans to Australian institutions)
-   Sea Mail – Customs Insured (very large or heavy loans to overseas institutions)
-   Transfer.

##### Reference no(s) 

The tracking number for each parcel in the shipment. Tracking numbers should be scanned from the consignment note or label (e.g. Registered Post label, Pack & Track International consignment note), rather than entered manually. Multiple numbers should be separated by commas.

##### Quantity sent

The number of specimens in the consignment.

##### Number of parcels

The number of parcels in the consignment. This number should correspond to the number of reference numbers.

##### Weight

The total weight of all the parcels in the consignment.

##### Postage

The total shipping cost for the consignment.

##### Comments

Any comments pertaining to the return of the loan. For example:

-   ‘Spirit material’
-   ‘Sent with MEL exchange 1234’
-   ‘Sent with H loan 12/07 (MEL ref. 1234)’.

##### Acknowledged

The date on which the consignment is confirmed as received. *Note:* this is a text field but dates should be entered in dd/mm/yyyy format.

#### Administrative fields

The following fields are automatically completed and cannot be edited.

##### Created by

The person who created the database record.

##### Created

The date the record was created.

##### Last edited by

The person who last edited the record.

##### Last edited

The date the record was last edited.

### Creating and editing non-MEL loans

#### Entering a new non-MEL loan

New non-MEL loan records are created by the Team Leader Collections Curation when the Manager Collections requests a loan:

1.  Log in to MELISR and open the *Non-MEL loans* collection
2.  Open the **Interactions** module
3.  Click **Loan w/o Preps** in the side bar
4.  Enter the following details:
    -   **Loan status** ­– ‘Requested’
    -   **Taxa**
    -   **Conditions**
    -   **Comments**
5.  Add **Loan agents** (**Lending institution**, **Botanist(s)** and **Student**)
6.  Delete the blank **Shipment** record
7.  Save the **Loan** record.

#### Processing an incoming non-MEL loan

1.  Open the online **Loans** processing tool (http://melisr.rbg.vic.gov.au/loanreturn/loans)
2.  Find the relevant loan using the **Find loan** function
    -   Select ‘Non-MEL loans’ the relevant Institution and ‘Requested loans’ and press **Submit**
    -   Select the relevant loan based on the Botanist (and/or Student) and click on ‘Borrower’ to check that the taxa accord with the loan paperwork and specimens
3.  Log in to MELISR and open the *non-MEL loans* collection
4.  Find and open the loan record by entering the MEL ref. no. in the **Simple Search** box. (*Note:* **Simple search** needs to be configured for non-MEL loans – see **Configuring simple search**, p. 178.)
5.  Select **Edit** and enter the following details:
    -   **Loan number**
    -   **Current due date**
    -   **Loan status** – ‘Current’
    -   **Date received**
    -   **Original due date**
    -   **Quantity outstanding**
    -   **Quantity borrowed**
    -   **Taxa** – if different to what was recorded when loan was requested
    -   **Conditions** ­ – e.g. permission for destructive sampling
    -   **Comments** ­­– if required
6.  Save the record
7.  If the loan contains specimens with barcodes, scan them in via the **Borrower** (http://melisr.rbg.vic.gov.au/borrower):
    -   Select the relevant **MEL reference number** from the drop-down list
    -   Scan the specimens into the **Enter barcodes** box (one barcode per line)
    -   In the **Add preparations** box, select the relevant **Preparation type** and **Curation Officer** (if the loan contains more than one type of preparation, you will need to scan them in multiple batches)
    -   Click **Add to loan**
    -   In lieu of marking off specimens on the loan list, annotate the paperwork with ‘\[no. specimens\] received via Borrower, \[date and initials\]’.

#### Returning a non-MEL loan without associated loan preparations

1.  Log in to MELISR and open the *Non-MEL loans* collection
2.  Find and open the loan record by entering the MEL ref. no. in the **Simple Search** box. (*Note:* **Simple Search** needs to be configured for non-MEL loans – see **Configuring simple search**, p. 178.)
3.  Select **Edit** and create a new **Shipment** record
4.  Enter the following details:
    -   **Shipped to** – this should always be the lending institution unless the loan is being transferred
    -   **Date sent**
    -   **Prepared by**
    -   **Method**
    -   **Reference no(s)**
    -   **Quantity sent**
    -   **No. parcels**
    -   **Weight**
    -   **Postage**
    -   **Comments**
5.  Edit the **Loan status** to ‘Returning’
6.  Save the record
7.  Check that **Quantity outstanding** has updated automatically and that it accords with the loan paperwork
8.  Create paperwork for the consignment using the **Herbarium transactions paperwork** page: http://melisr.rbg.vic.gov.au/transactions
9.  Create a PDF of the paperwork and e-mail it to the relevant Curator via the HerbMEL account
10. Print three copies of the paperwork (pink copy to be retained at MEL, white and yellow copies to be sent with specimens).

#### Returning a non-MEL loan with associated loan preparations

1.  Open the **Borrower**: http://melisr.rbg.vic.gov.au/borrower
2.  Select the relevant **MEL reference number** from the drop-down list
3.  Scan the specimens into the **Enter barcodes** box (one barcode per line)
4.  In the **Return preparations** box, select the relevant **Curation Officer** and edit the **Return date** if necessary (default is the current date)
5.  Select **Prepare for return** and check that the relevant preparation and quantities are flagged in the loan preparation list
6.  Select **Return**. The **Borrower** automatically adds a new shipment record to the relevant non-MEL loan record. Several fields need to be updated in MELISR.
7.  Log in to MELISR and open the *Non-MEL loans* collection
8.  Find and open the loan record by entering the MEL ref. no. in the **Simple Search** box. (*Note:* **Simple Search** needs to be configured for non-MEL loans – see **Configuring simple search**, p. 178.)
9.  Select **Edit** and enter the following details in the relevant **Shipment** record:
    -   **Method**
    -   **Reference no(s)**
    -   **No. parcels**
    -   **Weight**
    -   **Postage**
    -   **Comments**
10. Save the record
11. Check that **Quantity outstanding** has updated automatically and that it accords with the loan paperwork
12. In lieu of marking off specimens on the loan list, annotate the paperwork with ‘\[no. specimens\] returned via Borrower, \[date and initials\]’
13. Create paperwork for the consignment using the **Herbarium transactions paperwork** page: http://melisr.rbg.vic.gov.au/transactions
14. Create a PDF of the paperwork and e-mail it to the relevant Curator via the HerbMEL account
15. Print three copies of the paperwork (pink copy to be retained at MEL, white and yellow copies to be sent with specimens).


