<?

# get common
require "{$_SERVER['DOCUMENT_ROOT']}/scripts/common.php";

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <title>Stripey &#172; Easy Designs</title>
<?php docHead(); ?>
</head>
<body>
<?php message(); ?>
<div id="content">
  <h1>Stripey</h1>

  <h2 id="genInfo">General Information</h2>
  <dl>
    <dt>Purpose</dt>
    <dd>This script allows you to stripe just about anything you want &#8212; <code>DL</code>s, <code>OL</code>s, <code>UL</code>s, and <code>TABLES</code>s.</dd>
    <dt>Current Version</dt>
    <dd>0.1 (28 August 2006)</dd>
    <dt>Requirements</dt>
    <dd>This script requires Prototype.</dd>
  </dl>

  <h2 id="use">Use</h2>
  <p>You simply make a new Stripey, supplying it with the <code>ID</code> of the element you want to stripe:</p>
  <pre class="script"><code>var ul = new Stripey( 'my_id' );</pre>
  <p>Stripey will automatically classify the identified element&#8217;s rows as &#8220;odd&8221; or &#8220;even.&#8221; If you&#8217;d rather use other names, you can do that too:</p>
  <pre class="script"><code>var ul = new Stripey( 'my_id', 'pretty', 'prettier' );</code></pre>

  <h2 id="changeLog">Change Log</h2>
  <dl>
    <dt>0.1 (28 August 2006)</dt>
    <dd>Initial script</dd>
  </dl>

  <h2 id="demo">Demo</h2>
  <p><a href="/code/stripey/demo/">View this script in action</a></p>

  <h2 id="downloads">Optimized Releases</h2>
  <p>These releases have been optimized for production by removing unnecessary white space, carriage returns, etc.</p>
  <ul>
    <li><a href="/code/stripey/0.1/stripey-v0.1.zip">Compressed 0.1</a> [2.04<abbr title="kilobytes">KB</abbr> .zip archive]</li>
  </ul>

  <h2 id="development">Development Version</h2>
  <p>If you are interested in helping to further develop this script, you can <a href="/code/messager/working/stripey.js" title="Uncompressed Development Version [2.60Kb]">download the uncompressed JavaScript source file</a>.</p>

  <div id="extras">
  </div>
</div>
<?php foot(); ?>

</body>
</html>
