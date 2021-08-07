# Quality assurance tests

## Collection Object issues

### HighCatalogueNumbers

These catalogue numbers are too high

```sql{4-7}
SELECT co.CollectionObjectID
FROM collectionobject co
WHERE co.CollectionMemberID=4
AND LEFT(co.CatalogNumber,7)>(
  SELECT MAX(EndNumber) AS maxnumber
  FROM melnumbers
)
```

### DodgyPart

The part is not a letter

```sql{4}
SELECT co.CollectionObjectID
FROM collectionobject co
WHERE co.CollectionMemberID=4
AND RIGHT(co.CatalogNumber,1) NOT REGEXP '[a-zA-Z]'
```

## Temporal issues

### CatalogedBeforeCollectingDate

These records were ostensibly cataloged before they were collected

```sql{3,5-6}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN collectingevent ce ON co.CollectingEventID=ce.CollectingEventID
WHERE co.CollectionMemberID=4
AND co.TimestampCreated>'1992-01-01'
AND date(co.TimestampCreated)<date(ce.StartDate)
```

### DetDateEarlierThanCollDate

These records were apparently determined before they were collected

```sql{3-4,6-8}
SELECT DISTINCT co.CollectionObjectID
FROM collectionobject co
JOIN determination d ON co.CollectionObjectID=d.CollectionObjectID
JOIN collectingevent ce ON ce.CollectingEventID=co.CollectingEventID
WHERE co.CollectionMemberID=4
AND ((d.DeterminedDatePrecision=1 AND d.DeterminedDate<ce.StartDate) OR
  (d.DeterminedDatePrecision=2 AND LEFT(d.DeterminedDate, 7)<LEFT(ce.StartDate, 7)) OR
  (d.DeterminedDatePrecision=3 AND YEAR(d.DeterminedDate)<YEAR(ce.StartDate)))
```

## Preparation issues

### MissingPreparation

These records don't have any preparations

```sql{3,5}
SELECT co.CollectionObjectID
FROM collectionobject co
LEFT JOIN preparation p ON co.CollectionObjectID=p.CollectionObjectID
WHERE co.CollectionMemberID=4
AND p.PreparationID IS NULL
```

### DuplicateHerbariaInWrongPreparation

The list of herbaria that have been sent duplicates is in the wrong preparation
in these records

```sql{3-4,6}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN preparation p ON co.CollectionObjectID=p.CollectionObjectID
JOIN preptype pt ON p.PrepTypeID=pt.PrepTypeID
WHERE co.CollectionMemberID=4
AND p.PrepTypeID NOT IN (15,16,17) AND (p.Text1 IS NOT NULL AND p.Text1 !='')
```

### DuplicateCountMismatch

The quantity of duplicates does not match the number of herbaria listed in the
'MEL duplicates at' field

```sql{3-4,6}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN preparation p ON co.CollectionObjectID=p.CollectionObjectID
JOIN preptype pt ON p.PrepTypeID=pt.PrepTypeID
WHERE co.CollectionMemberID=4
AND LENGTH(p.Text1) - LENGTH(REPLACE(p.Text1, ',', '')) !=p.CountAmt-1
```

### SomethingInNumberThatShouldntBeThere

One (or more) of the preparations in this record has something in the storage
number field that should not be there

```sql{3,5-6}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN preparation p ON co.CollectionObjectID=p.CollectionObjectID
WHERE co.CollectionMemberID=4
AND p.PrepTypeID IN (1,3,4,8,10,12,13,15,16,17,24)
  AND !(p.SampleNumber IS NULL OR p.SampleNumber='')
```

### SomethingMissingFromNumberField

One (or more) of the preparations in these records is missing a storage number

```sql{3,5-6}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN preparation p ON co.CollectionObjectID=p.CollectionObjectID
WHERE co.CollectionMemberID=4
AND p.PrepTypeID NOT IN (1,3,4,5,8,10,12,13,14,15,16,17,24)
  AND (p.SampleNumber IS NULL OR p.SampleNumber='')
```

### JarSizeMissing

The jar size has not been entered for these spirit preparations

```sql{3-4,6}
SELECT co.CollectionObjectID
FROM collectionobject co
LEFT JOIN preparation p ON co.CollectionObjectID=p.CollectionObjectID
JOIN preptype pt ON pt.PrepTypeID=p.PrepTypeID AND pt.Name='Spirit'
WHERE co.CollectionMemberID=4
AND p.Integer1 IS NULL
```

### InappropriateQuantityInPreparation

The quantity is invalid for the preparation type [sic]

```sql{3,5-6}
SELECT co.CollectionObjectID
FROM collectionobject co
LEFT JOIN preparation p ON co.CollectionObjectID=p.CollectionObjectID
WHERE co.CollectionMemberID=4
AND ((p.CountAmt>1 AND p.PrepTypeID IN (1,3,4,8,10,12,13,14)) OR (p.CountAmt IS NULL )
  OR (p.PrepTypeID !=7 AND p.CountAmt=0))
```

### TooManyPrimaryPreparations

There are too many primary preparations (Sheet, Spirit etc.) in these records

```sql{3-4,6-7}
SELECT co.CollectionObjectID
FROM collectionobject co
LEFT JOIN preparation p ON co.CollectionObjectID=p.CollectionObjectID
  AND p.PrepTypeID IN (1,2,3,4,8,10,12,13)
WHERE co.CollectionMemberID=4
GROUP BY co.CollectionObjectID
HAVING COUNT(p.PrepTypeID)>1
```

### NoPrimaryPreparations

These records do not have a primary preparation (Sheet, Spirit etc.)

```sql{3-4,6-7}
SELECT co.CollectionObjectID
FROM collectionobject co
LEFT JOIN preparation p ON co.CollectionObjectID=p.CollectionObjectID
  AND p.PrepTypeID IN (1,2,3,4,6,8,10,12,13)
WHERE co.CollectionMemberID=4
GROUP BY co.CollectionObjectID
HAVING COUNT(p.PrepTypeID)=0
```

### MissingStorage

The records do not have the storage set

```sql{3-4,6}
SELECT co.CollectionObjectID
FROM collectionobject co
LEFT JOIN preparation p ON co.CollectionObjectID=p.CollectionObjectID
  AND p.PrepTypeID IN (1,2,3,4,6,8,10,12,13,156)
WHERE co.CollectionMemberID=4
AND p.StorageID IS NULL
```

This test overlaps with (or fully includes actually) the **NoPrimaryPreparation**
test. We might want to change that?

### DuplicateDuplicatePreparations

Multiple _Duplicate_ preparations

```sql{3,5,6-7}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN preparation p ON co.CollectionObjectID=p.CollectionObjectID
WHERE co.CollectionMemberID=4
AND p.PrepTypeID=15
GROUP BY co.CollectionObjectID
HAVING count(*)>1
```

### DuplicateSeedDuplicatePreparations

Multiple _Seed duplicate_ preparations

```sql{3,5,6-7}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN preparation p ON co.CollectionObjectID=p.CollectionObjectID
WHERE co.CollectionMemberID=294912
AND p.PrepTypeID=16
GROUP BY co.CollectionObjectID
HAVING count(*)>1
```

## Collecting Event issues

### ZombieCollector

Collectors have been entered, but 'Collector Unknown' box has been ticked

```sql{3-6,8}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN collectingevent ce ON co.CollectingEventID=ce.CollectingEventID
JOIN collectingeventattribute cea
  ON ce.CollectingEventAttributeID=cea.CollectingEventAttributeID
JOIN collector c ON ce.CollectingEventID=c.CollectingEventID
WHERE co.CollectionMemberID - 4
AND cea.YesNo3=true
```

### InferredFromVerbatimCollector

Verbatim collectors have been entered, but 'Collector Inferred' box has been ticked

```sql{3-6,8-9}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN collectingevent ce ON co.CollectingEventID=ce.CollectingEventID
JOIN collectingeventattribute cea
  ON ce.CollectingEventAttributeID=cea.CollectingEventAttributeID
JOIN collector c ON ce.CollectingEventID=c.CollectingEventID
WHERE co.CollectionMemberID=4
AND cea.Text1 IS NOT NULL
AND cea.YesNo2=true
```

### MissingPrimaryCollectors

There are no primary collectors for these records

```sql{3-4,6-7}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN collectingevent ce ON ce.CollectingEventID=co.CollectingEventID
JOIN collector c ON ce.CollectingEventID=c.CollectingEventID
WHERE co.CollectionMemberID=4
GROUP BY co.CollectionObjectID
HAVING SUM(c.IsPrimary)=0
```

### MissingCollectors

There are no collectors for these records and the verbatim collector, collector
unknown and collector illegible fields are empty

```sql{3-6,8-9}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN collectingevent ce ON ce.CollectingEventID=co.CollectingEventID
LEFT JOIN collector col ON ce.CollectingEventID=col.CollectingEventID
LEFT JOIN collectingeventattribute cea
  ON ce.CollectingEventAttributeID=cea.CollectingEventAttributeID
WHERE co.CollectionMemberID=4
AND col.CollectingEventID IS NULL AND (cea.Text1 IS NULL OR cea.Text1='')
AND (cea.YesNo3 IS NULL OR cea.YesNo3=0) AND (cea.YesNo4 IS NULL OR cea.YesNo4=0)
```

### GroupCollectors

A group agent has been entered as a collector

```sql{3-7,9}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN collection coll ON co.CollectionID=coll.CollectionID
  AND coll.CollectionID=4
JOIN collectingevent ce ON ce.CollectingEventID=co.CollectingEventID
LEFT JOIN collector col ON ce.CollectingEventID=col.CollectingEventID
JOIN agent aaa ON col.AgentID=aaa.AgentID
WHERE co.CollectionMemberID=4
AND aaa.AgentType=3
```

### NoCollectingDate

Do you remember what date you collected these records?

```sql{3-5,7}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN collectingevent ce ON ce.CollectingEventID=co.CollectingEventID
JOIN collector col ON col.CollectingEventID=ce.CollectingEventID
  AND col.IsPrimary=1
WHERE co.CollectionMemberID=4
AND ce.StartDate IS NULL AND col.AgentID=co.CreatedByAgentID
```

### EndDateWithNoStartDate

There is an end date, but no start date for these records

```sql{3,5}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN collectingevent ce ON ce.CollectingEventID=co.CollectingEventID
WHERE co.CollectionMemberID=4
AND ce.StartDate IS NULL AND ce.EndDate IS NOT NULL
```

### IncorrectAgentAsCollector

An incorrect agent name has been entered as a collector

```sql{3-5,7}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN collectingevent ce ON co.CollectingEventID=ce.CollectingEventID
JOIN collector col ON ce.CollectingEventID=col.CollectingEventID
JOIN agent a ON col.AgentID=a.AgentID
WHERE co.CollectionMemberID=4
AND a.FirstName LIKE '%[%'
```

### PrimaryCollectorNotFirst

The primary collector is not listed first

```sql{3-4,6}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN collectingevent ce ON ce.CollectingEventID=co.CollectingEventID
LEFT JOIN collector col ON ce.CollectingEventID=col.CollectingEventID
WHERE co.CollectionMemberID=4
AND col.OrderNumber=0 AND col.IsPrimary=false
```

### MissingCultSource

The following records are missing Cultivated Source

```sql{3-5,7}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN collectingevent ce ON ce.CollectingEventID=co.CollectingEventID
LEFT JOIN collectingeventattribute cea
  ON ce.CollectingEventAttributeID=cea.CollectingEventAttributeID
WHERE co.CollectionMemberID=4
AND cea.Text13 IS NOT NULL AND (cea.Text14 IS NULL OR cea.Text14='')
```

### MissingIntroSource

The following records are missing Introduced Source

```sql{3-5,7}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN collectingevent ce ON ce.CollectingEventID=co.CollectingEventID
LEFT JOIN collectingeventattribute cea
  ON ce.CollectingEventAttributeID=cea.CollectingEventAttributeID
WHERE co.CollectionMemberID=4
AND cea.Text11 IS NOT NULL AND cea.Text12 IS NULL
```

## Location issues

### MissingDatum

The datum has not been entered for these records

```sql{3-6,8-9}
SELECT co.CollectionObjectID
FROM collectionobject co
LEFT JOIN collectingevent ce ON ce.CollectingEventID=co.CollectingEventID
LEFT JOIN locality l ON l.LocalityID=ce.LocalityID
JOIN collector col ON col.CollectingEventID=ce.CollectingEventID
  AND col.IsPrimary=1
WHERE co.CollectionMemberID=4
AND (l.Latitude1 IS NOT NULL OR Longitude1 IS NOT NULL) AND l.Datum IS NULL
AND co.CreatedByAgentID=col.AgentID
```

### MissingAltitudeUnit

The altitude unit is missing in these records

```sql{3-4,6}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN collectingevent ce ON co.CollectingEventID=ce.CollectingEventID
JOIN locality l ON ce.LocalityID=l.LocalityID
WHERE co.CollectionMemberID=4
AND (l.MinElevation IS NOT NULL OR l.MaxElevation IS NOT NULL) AND l.Text1 IS NULL
```

### TooMuchAltitude

The altitude is too high for the state or territory

```sql{3-5,7-22}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN collectingevent ce ON co.CollectingEventID=ce.CollectingEventID
JOIN locality l ON ce.LocalityID=l.LocalityID
JOIN geography g ON l.GeographyID=g.GeographyID AND RankID=300
WHERE co.CollectionMemberID=4
AND ((g.Name='Victoria' AND l.Text1='m' AND (l.MinElevation>2010 OR l.maxElevation>2010)) OR
	(g.Name='Victoria' AND l.Text1='ft' AND (l.MinElevation>6600 OR l.maxElevation>6600)) OR
	(g.Name='Western Australia' AND l.Text1='m' AND (l.MinElevation>1280 OR l.maxElevation>1280)) OR
	(g.Name='Western Australia' AND l.Text1='ft' AND (l.MinElevation>4200 OR l.maxElevation>4200)) OR
	(g.Name='Northern Territory' AND l.Text1='m' AND (l.MinElevation>1560 OR l.maxElevation>1560)) OR
	(g.Name='Northern Territory' AND l.Text1='ft' AND (l.MinElevation>5100 OR l.maxElevation>5100)) OR
	(g.Name='South Australia' AND l.Text1='m' AND (l.MinElevation>1460 OR l.maxElevation>1460)) OR
	(g.Name='South Australia' AND l.Text1='ft' AND (l.MinElevation>4800 OR l.maxElevation>4800)) OR
	(g.Name='Queensland' AND l.Text1='m' AND (l.MinElevation>1650 OR l.maxElevation>1650)) OR
	(g.Name='Queensland' AND l.Text1='ft' AND (l.MinElevation>5400 OR l.maxElevation>5400)) OR
	(g.Name='New South Wales' AND l.Text1='m' AND (l.MinElevation>2250 OR l.maxElevation>2250)) OR
	(g.Name='New South Wales' AND l.Text1='ft' AND (l.MinElevation>7400 OR l.maxElevation>7400)) OR
	(g.Name='Australian Capital Territory' AND l.Text1='m' AND (l.MinElevation>2015 OR l.maxElevation>2015)) OR
	(g.Name='Australian Capital Territory' AND l.Text1='ft' AND (l.MinElevation>6300 OR l.maxElevation>6300)) OR
	(g.Name='Tasmania' AND l.Text1='m' AND (l.MinElevation>1640 OR l.maxElevation>1640)) OR
	(g.Name='Tasmania' AND l.Text1='ft' AND (l.MinElevation>5350 OR l.maxElevation>5350)))
```

### MissingLocality

The locality is missing in these records

```sql{3-4,6}
SELECT co.CollectionObjectID
FROM collectionobject co
LEFT JOIN collectingevent ce ON ce.CollectingEventID=co.CollectingEventID
LEFT JOIN locality l ON l.LocalityID=ce.LocalityID
WHERE co.CollectionMemberID=4
AND ce.LocalityID IS NULL
```

### MissingSourceOrPrecision

These records are missing geocode source and/or geocode precision

```sql{3-5,7-9}
SELECT co.CollectionObjectID
FROM collectionobject co
LEFT JOIN collectingevent ce ON ce.CollectingEventID=co.CollectingEventID
LEFT JOIN locality l ON l.LocalityID=ce.LocalityID
LEFT JOIN geocoorddetail gc ON l.LocalityID=gc.LocalityID
WHERE co.CollectionMemberID=4
AND Latitude1 IS NOT NULL AND ((l.Text2 IS NULL AND gc.AgentID IS NULL)
  OR (l.OriginalElevationUnit IS NULL AND gc.GeoRefAccuracy IS NULL
    AND gc.MaxUncertaintyEst IS NULL))
```

### LocalityNameNoDetailsGiven

'No details given' should only be entered in the Locality Name field if there is
no geography information either; otherwise the country etc. should be entered

```sql{3-4,6-8}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN collectingevent ce ON co.CollectingEventID=ce.CollectingEventID
JOIN locality l ON ce.LocalityID=l.LocalityID
WHERE co.CollectionMemberID=4
AND l.LocalityName IN('[No details given.]', '[No details given].',
  '[No details given]', 'No details given.', 'No details given')
AND l.GeographyID>1
```

### TooEarlyForGPS

These collections might be a bit too old for the geocode source to be GPS

```sql{3-4,6}
SELECT co.CollectionObjectID
FROM collectionobject co
LEFT JOIN collectingevent ce ON ce.CollectingEventID=co.CollectingEventID
LEFT JOIN locality l ON l.LocalityID=ce.LocalityID
WHERE co.CollectionMemberID=4
AND l.LatLongMethod=4 AND ce.StartDate<'1980-01-01'
```

### MissingGeography

The geography is missing in these records

```sql{3-4,6}
SELECT co.CollectionObjectID
FROM collectionobject co
LEFT JOIN collectingevent ce ON ce.CollectingEventID=co.CollectingEventID
LEFT JOIN locality l ON l.LocalityID=ce.LocalityID
WHERE co.CollectionMemberID=4
AND l.GeographyID IS NULL
```

### CultivatedInGeography

'Cultivated' should not be entered in the geography field

```sql{3-4,6}
SELECT co.CollectionObjectID
FROM collectionobject co
LEFT JOIN collectingevent ce ON ce.CollectingEventID=co.CollectingEventID
LEFT JOIN locality l ON l.LocalityID=ce.LocalityID
WHERE co.CollectionID=4
  AND l.GeographyID=31752
```

## Determination issues

### MissingDetermination

These records don't have any determinations

```sql{3,5}
SELECT co.CollectionObjectID
FROM collectionobject co
LEFT JOIN determination d ON co.CollectionObjectID=d.CollectionObjectID
WHERE co.CollectionMemberID=4
AND d.DeterminationID IS NULL
```

### TypeMismatch

'Stored under this name' is flagged, but the Det. type is not 'Type status'

```sql{3,5}
SELECT co.CollectionObjectID
FROM collectionobject co
LEFT JOIN determination d ON co.CollectionObjectID=d.CollectionObjectID
WHERE co.CollectionMemberID=4
AND d.FeatureOrBasis !='Type status' AND d.YesNo1=1
```

### MissingTaxonName

These records have determinations that are missing taxon names

```sql{3,5}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN determination d ON co.CollectionObjectID=d.CollectionObjectID
WHERE co.CollectionMemberID=4
AND d.TaxonID IS NULL AND d.AlternateName IS NULL
```

### TypeDetIsCurrent

The type det. is flagged as the current det. in these records

```sql{3,5}
SELECT co.CollectionObjectID
FROM collectionobject co
LEFT JOIN determination d ON co.CollectionObjectID=d.CollectionObjectID
WHERE co.CollectionMemberID=4
AND d.FeatureOrBasis='Type status' AND d.IsCurrent=1
```

### TypeDetOverriddenByIndet

Current det. for type is INDET

```sql{3-5,7}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN determination ty ON co.CollectionObjectID=ty.CollectionObjectID AND ty.YesNo1=1
JOIN determination d ON co.CollectionObjectID=d.CollectionObjectID AND d.IsCurrent=1
JOIN taxon t ON d.TaxonID=t.TaxonID
WHERE co.CollectionMemberID=4
AND t.RankID<220
```

### AlternativeNameInCurrentDetermination

The current determination has something in the 'Alternative name' field

```sql{3,5}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN determination d ON co.CollectionObjectID=d.CollectionObjectID AND d.IsCurrent=1
WHERE co.CollectionMemberID=4
AND d.AlternateName IS NOT NULL AND d.AlternateName !=''
```

### MissingProtologue

These records are types, but some or all of the protologue details are missing

```sql{3-5,7}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN determination d ON co.CollectionObjectID=d.CollectionObjectID
  AND d.FeatureOrBasis='Type status'
JOIN taxon t ON d.TaxonID=t.TaxonID
WHERE co.CollectionMemberID=4
AND t.CommonName IS NULL AND NcbiTaxonNumber IS NULL
```

### StoredUnderMultipleNames

'Stored under this name' is flagged in more than one determination

```sql{3-4,6-7}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN determination d ON co.CollectionObjectID=d.CollectionObjectID
  AND d.YesNo1=1
WHERE co.CollectionMemberID=4
GROUP BY co.CollectionObjectID
HAVING count(*)>1
```

## Conserv. Description/Event issues

### TreatedByNotNullAndCurationSponsorNull

There is something in Treated By but nothing in Curation Sponsor

```sql{3-6,8}
SELECT co.CollectionObjectID
FROM collectionobject co
LEFT JOIN collectionobjectattribute coa
  ON co.CollectionObjectAttributeID=coa.CollectionObjectAttributeID
JOIN conservdescription cond ON cond.CollectionObjectID=co.CollectionObjectID
JOIN conservevent cone ON cond.ConservDescriptionID=cone.ConservDescriptionID
WHERE co.CollectionMemberID=4
AND cone.TreatedByAgentID IS NOT NULL AND coa.Text4 IS NULL
```

### TreatedByNotNullOtherTreatmentFieldsNull

There is something in Treated By but nothing in Treatment Completed or Treatment
Report

```sql{3-4,6-7}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN conservdescription cond ON co.CollectionObjectID=cond.CollectionObjectID
JOIN conservevent cone ON cond.ConservDescriptionID=cone.ConservDescriptionID
WHERE co.CollectionMemberID=4
AND cone.TreatedByAgentID IS NOT NULL
  AND (cone.TreatmentCompDate IS NULL AND cone.TreatmentReport IS NULL)
```

### SeverityOrCauseNotNullButAssessedByNull

There is something in Severity of Cause of Damage, but nothing in Assessed By

```sql{3-4,6-7}
SELECT co.CollectionObjectID
FROM collectionobject co
JOIN conservdescription cond ON co.CollectionObjectID=cond.CollectionObjectID
JOIN conservevent cone ON cond.ConservDescriptionID=cone.ConservDescriptionID
WHERE co.CollectionMemberID=4
AND cone.CuratorID IS NULL
  AND (cone.AdvTestingExamResults IS NOT NULL OR cone.ConditionReport IS NOT NULL)
```

## Agent issues

### GroupAgentsWithoutIndividuals

These group agents have not had any individuals added to the group, or have not
been given a last name

```sql{1-4}
SELECT a.AgentID
FROM agent a
LEFT JOIN groupperson gp ON a.AgentID=gp.GroupID
WHERE a.AgentType=3 AND gp.GroupPersonID IS NULL
```

### PartMissingFromMultisheetMessage

The part is missing from the multisheet message in these records

```sql{1,3,5-6}
SELECT co.CollectionObjectID, p.Remarks
FROM collectionobject co
JOIN preparation p ON co.CollectionObjectID=p.CollectionObjectID
WHERE co.CollectionMemberID=4
AND p.PrepTypeID !=18
AND p.Remarks IS NOT NULL AND p.Remarks !=''
```

Query finds all collection object records with a multi-sheet string in the
preparation. The MEL numbers can be extracted from the multi-sheet string with
the regular expression `/(MEL ?\d{1,7})([[:alpha:]]?)/g` and then one can check
whether the part is there.

### AgentsWithNoLastName

These group agents have not had any individuals added to the group [sic]

```sql{1-4}
SELECT a.AgentID
FROM agent a
LEFT JOIN groupperson gp ON a.AgentID=gp.GroupID
WHERE a.LastName IS NULL
```

### GroupAgentAsPersonAgent

This appears to be a group agent, but has been entered as a person agent

```sql{1-3}
SELECT a.AgentID
FROM agent a
WHERE a.LastName LIKE '%;%' AND a.AgentType=1
```

## Taxon issues

### NewSubgenus

The following taxon has been added as a subgenus; check that it should not be a
species

```sql{1-3}
SELECT t.TaxonID
FROM taxon t
WHERE t.RankID=190
```

### MissingAuthor

The following taxon names are missing the author

```sql{1-5}
SELECT t.TaxonID
FROM taxon t
WHERE  t.RankID>180
AND t.Name NOT LIKE '%sp.%' AND t.NcbiTaxonNumber IS NULL AND IsHybrid IS NULL
AND t.Author IS NULL
```

This query does not give the intended results and should probably be split up.

Autonyms with authors:

```sql
SELECT FullName, Author
FROM taxon
WHERE RankID>220 AND Name=SUBSTRING_INDEX(SUBSTRING_INDEX(FullName, ' ', 2), ' ', -1)
  AND Author IS NOT NULL
```
